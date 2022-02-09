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
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ReleaseYear: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    Format: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Stars: {
        type: DataTypes.JSON,
        allowNull: false,
    },

}, {sequelize, timestamps: false, tableName: 'movies'});

module.exports = Movies;
