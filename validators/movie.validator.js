const Joi = require('joi');

const filmFormat = require('../configs/FormatsOfFilms');

const movieValidator = Joi.object({
    title: Joi
        .string()
        .trim()
        .required(),
    releaseYear: Joi
        .number()
        .required(),
    format: Joi
        .string()
        .allow(...Object.values(filmFormat)),
    stars: Joi
        .string()
        .required(),
});

module.exports = {
    movieValidator
};
