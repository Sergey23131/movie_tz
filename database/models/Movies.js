const {sequelize} = require('../index');
const {Model, DataTypes} = require('sequelize');

class Movies extends Model {
}

Movies.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    format: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stars: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {sequelize, timestamps: false, tableName: 'movies'});

module.exports = Movies;
