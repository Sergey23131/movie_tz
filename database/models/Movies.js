const {sequelize} = require('../index');
const filmFormat = require('../../configs/FormatsOfFilms');
const {Model, DataTypes} = require('sequelize');

class Movies extends Model {
}

Movies.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Release_Year: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Format: {
        type: DataTypes.STRING,
        allowNull: false,
        enum: Object.values(filmFormat)
    },
    Stars: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {sequelize, timestamps: false, tableName: 'movies'});

module.exports = Movies;
