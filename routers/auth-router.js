const {authController} = require('../controllers');
const authRouter = require('express').Router();

const {isMovieBodyValid} = require('../middlewares/isBodyValid.middleware');
const {movieValidator} = require('../validators/movie.validator');

const createMovieMiddleware = require('../middlewares/createMovie.middleware');
const loginMiddleware = require('../middlewares/login.middleware');
const IdMiddleware = require('../middlewares/id.middleware');
const fileMiddleware = require('../middlewares/file.middleware');

authRouter.post('/',
    loginMiddleware.isloginBodyValid,
    loginMiddleware.loginMiddleware,
    authController.authUsers);

authRouter.post('/movieCreate',
    createMovieMiddleware.createUserMiddleware,
    authController.createMovie);

authRouter.post('/loadFile', fileMiddleware.readfile, authController.loadFile);

authRouter.delete('/movieDelete/:movie_id',
    IdMiddleware.checkMovieID,
    authController.deleteMovie);

module.exports = authRouter;