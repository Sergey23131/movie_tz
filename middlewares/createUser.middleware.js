const {UserModel} = require('../database/models');

const {ErrorHandler, errors_massage, errors_code} = require('../errors');

const userValidator = require('../validators/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const bodyEmail = req.body.email;

            const {error, value} = await userValidator.userValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errors_code.NOT_VALID, errors_massage.NOT_VALID_BODY);
            }

            await UserModel.findOne({email:bodyEmail}).then(email=>{
                console.log(email)
                if (email){
                    throw new ErrorHandler(errors_code.EXIST, errors_massage.EMAIL_EXIST);

                }
            });

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
