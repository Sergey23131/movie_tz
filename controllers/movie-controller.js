const {MovieModel} = require('../database/models/');

const {Op} = require('sequelize');

module.exports = {
    getAllMovies: async (req, res, next) => {
        try {
            const AllMovies = await MovieModel.findAll({
                order: [
                    ['Title', 'ASC']
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
            const titleBody = req.body.title;

            const movieByTitle = await MovieModel.findOne({where: {title: titleBody}});

            res.json(movieByTitle);
        } catch (e) {
            next(e);
        }
    },

    getMovieByStar: async (req, res, next) => {
        try {
            const {star} = req.body;

            const movieByStar = await MovieModel.findAll({where: {stars:  { [Op.like]: `%${star}%`} }});

            res.json(movieByStar);
        } catch (e) {
            next(e);
        }
    },
};
