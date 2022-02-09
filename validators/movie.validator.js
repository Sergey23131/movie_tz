const Joi = require('joi');

const filmFormat = require('../configs/FormatsOfFilms');

const movieValidator = Joi.object({
    Title: Joi
        .string()
        .trim()
        .required(),
    ReleaseYear: Joi
        .number()
        .required(),
    Format: Joi
        .string()
        .allow(...Object.values(filmFormat)),
    Stars: Joi
        .array().items(Joi.string())
        .required(),
});

module.exports = {
    movieValidator
};
