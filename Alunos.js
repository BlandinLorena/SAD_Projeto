// models/Alunos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Alunos = sequelize.define('Alunos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    turmaId: { 
        type: DataTypes.INTEGER,
        references: {
            model: 'Turmas', 
            key: 'id', 
        },
    },

});

module.exports = Alunos;