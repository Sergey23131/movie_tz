const {O_Auth, UserModel, MovieModel} = require('../database/models/');

const {errors_code} = require('../errors');
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

            res.status(errors_code.UPDATE_DATA).json('You add new film!');
        } catch (e) {
            next(e);
        }
    },

    deleteMovie: async (req, res, next) => {
        try {
            const {movie_id} = req.params;

            await MovieModel.destroy({where: {id: movie_id}});

            res.status(errors_code.UPDATE_DATA).json('Film was removed');
        } catch (e) {
            next(e);
        }
    },

    loadFile: (req, res, next) => {
        try {

            res.status(errors_code.UPDATE_DATA).json('Movies was added into our database');
        } catch (e) {
            next(e);
        }
    }
};
