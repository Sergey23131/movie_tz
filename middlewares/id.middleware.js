const {MovieModel} = require('../database/models');

const {errors_massage, errors_code, ErrorHandler} = require('../errors');

module.exports = {
    checkMovieID: async (req, res, next) => {
        try {
            const {movie_id} = req.params;

            const oneMovie = await MovieModel.findByPk(movie_id);

            if (!oneMovie) {
                throw new ErrorHandler(errors_massage.NOT_VALID_ID, errors_code.NOT_FOUND);
            }

            req.movie = oneMovie;

            next();
        } catch (e) {
            next(e);
        }
    }
};