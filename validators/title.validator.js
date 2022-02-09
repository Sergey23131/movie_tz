const Joi = require('joi');

const titleValidator = Joi.object({
    Title: Joi
        .string()
        .trim()
        .required()
});

module.exports = {
    titleValidator
};
