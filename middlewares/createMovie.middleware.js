const {MovieModel} = require('../database/models');
const movieValidator = require('../validators/movie.validator');


module.exports = {
    createMovieMiddleware: async (req, res, next) => {
        try {

            if (req.body.releaseYear > 2021 || req.body.releaseYear <= 1850) {
                throw new Error('There is not valid years of release');

            }

            const {error, value} = await movieValidator.movieValidator.validate(req.body);

            if (error) {
                throw new Error('There is not valid info');
            }

            const movieByTitle = await MovieModel.findOne({
                where: {
                    title: value.title,
                    releaseYear: value.releaseYear
                }
            });

            if (movieByTitle) {
                throw new Error('This film exist in database');
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
