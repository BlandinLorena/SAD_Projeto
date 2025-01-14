// models/Turmas.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Turmas = sequelize.define('Turmas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Turmas;