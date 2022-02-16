const {movieController} = require('../controllers');
const movieRouter = require('express').Router();

const IdMiddleware = require('../middlewares/id.middleware');
const checkTockenMiddleware = require('../middlewares/checkToken.middleware');
const {isMovieBodyValid} = require('../middlewares/isBodyValid.middleware');

const {starValidator} = require('../validators/star.validator');
const {titleValidator} = require('../validators/title.validator');


movieRouter.get('/',
    checkTockenMiddleware.checkAccessToken,
    movieController.getAllMovies);

movieRouter.get('/ByTitle',
    checkTockenMiddleware.checkAccessToken,
    isMovieBodyValid(titleValidator),
    movieController.getMovieByTitle);

movieRouter.get('/ByStar',
    checkTockenMiddleware.checkAccessToken,
    isMovieBodyValid(starValidator),
    movieController.getMovieByStar);

movieRouter.get('/:movie_id',
    checkTockenMiddleware.checkAccessToken,
    IdMiddleware.checkMovieID,
    movieController.getMovieByID);

module.exports = movieRouter;