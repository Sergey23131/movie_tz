const {AUTHORIZATION} = require('../configs/constants');
const {errors_code, errors_massage, ErrorHandler} = require('../errors');
const {jwtService} = require('../services');
const {O_Auth} = require('../database/models');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({where: {access_token: token}});

            if (!tokenResponse) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            req.user = tokenResponse.user_id;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await jwtService.verifyToken(token, tokenType.REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(errors_massage.NOT_VALID_TOKEN, errors_code.NOT_VALID);
            }

            await O_Auth.findOneAndDelete({refresh_token: token});

            req.token = token;
            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
