const {UserModel} = require('../database/models');
const {passwordService} = require('../services');
const {errors_code} = require('../errors');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const allUsers = await UserModel.findAll({
                attributes: {
                    exclude: ['password']
                }
            });

            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            await UserModel.create({...req.body, password: hashedPassword});

            res.status(errors_code.UPDATE_DATA).json('You create new user!');
        } catch (e) {
            next(e);
        }
    }
};
