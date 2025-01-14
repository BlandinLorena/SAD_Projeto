// models/Session.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Session = sequelize.define('Session', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios', 
            key: 'id',
        },
    },
});

module.exports = Session;