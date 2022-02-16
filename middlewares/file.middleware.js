const {errors_massage, errors_code, ErrorHandler} = require('../errors');
const {DOCS_MIMETYPES, FILE_MAX_SIZE} = require('../configs/constants');

const fs = require('fs').promises;
const path = require('path');
const {MovieModel} = require('../database/models');
const movieValidator = require('../validators/movie.validator');


module.exports = {
    checkfile: (req, res, next) => {
        try {
            const {txt} = req.files || {};

            if (!txt) {
                next();
                return;
            }

            const {size, mimetype} = txt;
console.log(mimetype,size)
            if (!DOCS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(errors_massage.WRONG_FORMAT, errors_code.NOT_VALID);
            }

            if (size > FILE_MAX_SIZE) {
                throw new ErrorHandler(errors_massage.MAX_SIZE, errors_code.NOT_VALID);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    readfile: async (req, res, next) => {
        try {
            const myFile = req.files.txt;//txt(name of field in postman)

            const filepath = path.join(__dirname + myFile.name);

            await myFile.mv(filepath);

            const foo = async () => {
                const fileData = await fs.readFile(`./middlewares${myFile.name}`);
                const fields = ['Title', 'Release Year', 'Format', 'Stars'];
                const movies = [];
                let movieBuffer = {};

                fileData.toString().split('\n')
                    .forEach(string => {
                        const arrayFromStr = string.split(': ');

                        if (arrayFromStr.length <= 1) {
                            movies.push(movieBuffer);
                            movieBuffer = {};
                            return;
                        }
                        if (fields.includes(arrayFromStr[0])) {
                            movieBuffer[arrayFromStr[0].charAt(0).toLowerCase() + arrayFromStr[0].slice(1).split(' ')
                                .join('')] = arrayFromStr[1];
                        }

                        if (fields.includes(arrayFromStr[0])&&arrayFromStr[2]) {
                            movieBuffer[arrayFromStr[0].charAt(0).toLowerCase() + arrayFromStr[0].slice(1).split(' ')
                                .join('')] = arrayFromStr[1]+': '+arrayFromStr[2];
                        }

                    });

                for (const movie of movies) {

                    if (movie.title) {

                        const {error, value} = await movieValidator.movieValidator.validate(movie);

                        if (error) {
                            throw new ErrorHandler(errors_code.NOT_VALID, errors_massage.NOT_VALID_DATA);
                        }

                        await MovieModel.create({
                            ...value
                        });
                    }
                }
            };

            foo();

            next();
        } catch (e) {
            next(e);
        }
    }
};
