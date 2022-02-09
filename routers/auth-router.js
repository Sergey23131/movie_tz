const {authController} = require('../controllers');
const authRouter = require('express').Router();

const {isMovieBodyValid} = require('../middlewares/isBodyValid.middleware');
const {movieValidator} = require('../validators/movie.validator');

const createMovieMiddleware = require('../middlewares/createMovie.middleware');
const loginMiddleware = require('../middlewares/login.middleware');

authRouter.post('/',
    loginMiddleware.isloginBodyValid,
    loginMiddleware.loginMiddleware,
    authController.authUsers);

authRouter.post('/movieCreate',

    createMovieMiddleware.createUserMiddleware,
    authController.createMovie);

authRouter.post('/movieDelete/:movie_id');

module.exports = authRouter;