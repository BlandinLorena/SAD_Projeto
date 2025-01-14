const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuários = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Padrão para falso, significando que o usuário não é um administrador
    },
    turmaid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
    // Adicione outros campos conforme necessário
});

module.exports = Usuários;