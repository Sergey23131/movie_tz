const {MovieModel} = require('../database/models/');

const {Op} = require('sequelize');
const {movieService} = require('../services/index');

module.exports = {
    getAllMovies: async (req, res, next) => {
        try {

            const allMovies = await movieService.getAllMovies(req.query);

            res.json(allMovies);
        } catch (e) {
            next(e);
        }
    },

    getMovieByID: (req, res, next) => {
        try {

            res.json(req.movie);
        } catch (e) {
            next(e);
        }
    },

    getMovieByTitle: async (req, res, next) => {
        try {
            const titleBody = req.body.title;

            const movieByTitle = await MovieModel.findOne({where: {title: {[Op.like]: `%${titleBody}%`}}});

            res.json(movieByTitle);
        } catch (e) {
            next(e);
        }
    },

    getMovieByStar: async (req, res, next) => {
        try {
            const {star} = req.body;

            const movieByStar = await MovieModel.findAll({where: {stars: {[Op.like]: `%${star}%`}}});

            res.json(movieByStar);
        } catch (e) {
            next(e);
        }
    },
};
