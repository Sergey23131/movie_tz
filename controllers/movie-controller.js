const {MovieModel} = require('../database/models/');

const {errors_code, ErrorHandler, errors_massage} = require('../errors');

module.exports = {
    getAllMovies: async (req, res, next) => {
        try {
            const AllMovies = await MovieModel.findAll({
                order: [
                    ['Title', 'DESC']
                ]
            });

            res.json(AllMovies);
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
            const title = req.body.Title;

            const movieByTitle = await MovieModel.findOne({where: {Title: title}});

            res.json(movieByTitle);
        } catch (e) {
            next(e);
        }
    },

    getMovieByStar: async (req, res, next) => {
        try {
            const {Star} = req.body;

            const movieByStar = await MovieModel.findAll({where: {Stars: {$like: [Star ]}}});

            res.json(movieByStar);
        } catch (e) {
            next(e);
        }
    },
};
