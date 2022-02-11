const {DataTypes, Model} = require('sequelize');

const {sequelize} = require('../index');

class O_Auth extends Model {
}

O_Auth.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false

    }

}, {sequelize, timestamps: false, tableName: 'o_auth'});

module.exports = O_Auth;
