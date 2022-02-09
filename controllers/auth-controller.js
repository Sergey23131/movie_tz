const {O_Auth, UserModel} = require('../database/models/');

const {errors_code, ErrorHandler, errors_massage} = require('../errors');
const {jwtService} = require('../services');

module.exports = {
    authUsers: async (req, res, next) => {
        try {

            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: req.user.id
            });

            const oneUser = await UserModel.findByPk(req.user.id, {
                attributes: {
                    exclude: ['password']
                }
            });

            res.json({
                user: oneUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    createMovie: (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json(req.movie);
        } catch (e) {
            next(e);
        }
    }
};
