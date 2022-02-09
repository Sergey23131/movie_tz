const Joi = require('joi');

const starValidator = Joi.object({
    Star: Joi
        .string()
        .trim()
        .required(),

});

module.exports = {
    starValidator
};
