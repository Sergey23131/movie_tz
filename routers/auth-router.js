const {authController} = require('../controllers');
const authRouter = require('express').Router();

const createMovieMiddleware = require('../middlewares/createMovie.middleware');
const checkTockenMiddleware = require('../middlewares/checkToken.middleware');
const loginMiddleware = require('../middlewares/login.middleware');
const IdMiddleware = require('../middlewares/id.middleware');
const fileMiddleware = require('../middlewares/file.middleware');

authRouter.post('/',
    loginMiddleware.isloginBodyValid,
    loginMiddleware.loginMiddleware,
    authController.authUsers);

authRouter.post('/movieCreate',
    checkTockenMiddleware.checkAccessToken,
    createMovieMiddleware.createUserMiddleware,
    authController.createMovie);

authRouter.post('/loadFile',checkTockenMiddleware.checkAccessToken, fileMiddleware.readfile, authController.loadFile);

authRouter.delete('/movieDelete/:movie_id',
    checkTockenMiddleware.checkAccessToken,
    IdMiddleware.checkMovieID,
    authController.deleteMovie);

module.exports = authRouter;
