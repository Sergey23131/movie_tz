const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('movie-tz', 'root', 'pass', {
    dialect: 'sqlite',
    host: ':memory:',
});

module.exports = {sequelize};
