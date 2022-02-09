const {ErrorHandler, errors_massage, errors_code} = require('../errors');

module.exports = {
    isMovieBodyValid: (validation) => (req, res, next) => {
        try {
            const {error, value} = validation.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_code.NOT_VALID, errors_massage.NOT_VALID_DATA);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};
