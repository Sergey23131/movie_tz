const {movieController} = require('../controllers');
const movieRouter = require('express').Router();

const IdMiddleware = require('../middlewares/id.middleware');
const {isMovieBodyValid} = require('../middlewares/isBodyValid.middleware');

const {starValidator} = require('../validators/star.validator');
const {titleValidator} = require('../validators/title.validator');


movieRouter.get('/', movieController.getAllMovies);

movieRouter.get('/:movie_id', IdMiddleware.checkMovieID, movieController.getMovieByID);

movieRouter.get('/ByTitle', isMovieBodyValid(titleValidator), movieController.getMovieByTitle);

movieRouter.get('/ByStar', isMovieBodyValid(starValidator), movieController.getMovieByStar);

module.exports = movieRouter;