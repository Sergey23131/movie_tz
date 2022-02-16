const {MovieModel} = require('../database/models');

const {ErrorHandler, errors_code, errors_massage} = require('../errors');
const movieValidator = require('../validators/movie.validator');


module.exports = {
    createMovieMiddleware: async (req, res, next) => {
        try {

            if (req.body.releaseYear > 2021 || req.body.releaseYear <= 1850) {
                throw new ErrorHandler(errors_code.NOT_VALID, errors_massage.YEAR_ERROR);

            }

            const {error, value} = await movieValidator.movieValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_code.NOT_VALID, errors_massage.NOT_VALID_FIELDS);
            }

            const movieByTitle = await MovieModel.findOne({
                where: {
                    title: value.title,
                    releaseYear: value.releaseYear
                }
            });

            if (movieByTitle) {
                throw new ErrorHandler(errors_code.NOT_VALID, errors_massage.FILM_EXIST);
            }

            await MovieModel.create({
                ...value,
            });

            next();
        } catch (e) {
            next(e);
        }
    }
};
