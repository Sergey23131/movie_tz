const {MovieModel} = require('../database/models');
const {query} = require('express');

module.exports = {
    getAllMovies: async (query = {}) => {
        const {
            order = 'ASC',
        } = query;

        switch (order) {
            case 'ASC':
                const AllMovies = await MovieModel.findAll({
                    order: [
                        ['title', 'ASC']
                    ]
                });

                return AllMovies;
            case 'DESC':
                const Movies = await MovieModel.findAll({
                    order: [
                        ['title', 'DESC']
                    ]
                });
                return Movies;

        }
    }
};
