// models/Denuncias.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Alunos = require('./Alunos');
const Usuários = require('./Usuários'); 

const Denuncias = sequelize.define('Denuncias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alunoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Alunos,
            key: 'id',
        },
    },
    usuarioId: { 
        type: DataTypes.INTEGER,
        references: {
            model: Usuários,
            key: 'id',
        },
    },
    turmaid: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
});

module.exports = Denuncias;