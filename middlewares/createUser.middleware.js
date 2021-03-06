const {UserModel} = require('../database/models');

const {ErrorHandler, errors_massage, errors_code} = require('../errors');

const userValidator = require('../validators/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {

            const {error, value} = await userValidator.userValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_code.NOT_VALID, errors_massage.NOT_VALID_BODY);
            }

            const loginInfo = await UserModel.findOne({where:{email: req.body.email}});

            if (loginInfo) {
                throw new ErrorHandler(errors_massage.EMAIL_EXIST, errors_code.EXIST);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
