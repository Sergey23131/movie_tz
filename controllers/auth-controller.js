const {O_Auth, UserModel} = require('../database/models/');

const {errors_code, ErrorHandler, errors_massage} = require('../errors');
const {jwtService} = require('../services');

module.exports = {
    authUsers: async (req, res, next) => {
        try {
            const tokenPair = jwtService.generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: req.user._id
            });

            const oneUser = await UserModel.findByPk(req.user.id, {
                attributes: {
                    exclude: ['password']
                }
            });

           /* const a = await O_Auth.findByPk(req.user.id);
            console.log(a)
*/
            res.json({
                user: oneUser,
                ...tokenPair
            });

            res.json();
        } catch (e) {
            next(e);
        }
    },

    /*createUser: async (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json('');
        } catch (e) {
            next(e);
        }
    }*/
};
