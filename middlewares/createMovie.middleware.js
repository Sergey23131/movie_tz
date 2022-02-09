const {MovieModel} = require('../database/models');

const {ErrorHandler, errors_code, errors_massage} = require('../errors');
const movieValidator = require("../validators/movie.validator");
module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {error, value} = await movieValidator.movieValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_code.NOT_VALID, errors_massage.NOT_VALID_DATA);
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
