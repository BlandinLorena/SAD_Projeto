const Usuários = require('../models/Usuários');

//Novo Usuário
const createUsuário = async (req, res) => {
    const { username, password, isAdmin } = req.body;

    try {
        const newUsuário = await Usuários.create({ username, password, isAdmin });
        res.status(201).json(newUsuário);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao criar Usuário', message: error.message });
    }
};

//Get Usuários
const getAllUsuários = async (req, res) => {
    try {
        const usuários = await Usuários.findAll();
        res.status(200).json(usuários);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar Usuários' });
    }
};

// Get Usuário por ID
const getUsuárioById = async (req, res) => {
    const { id } = req.params;

    try {
        const usuário = await Usuários.findByPk(id);
        if (usuário) {
            res.status(200).json(usuário);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar Usuário' });
    }
};

// Update Usuário por ID
const updateUsuário = async (req, res) => {
    const { id } = req.params;
    const { username, password, isAdmin } = req.body;

    try {
        const [updated] = await Usuários.update({ username, password, isAdmin }, { where: { id } });
        if (updated) {
            const updatedUsuário = await Usuários.findByPk(id);
            res.status(200).json(updatedUsuário);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao atualizar Usuário' });
    }
};

// Delete Usuário por ID
const deleteUsuário = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Usuários.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao deletar Usuário' });
    }
};

module.exports = {
    createUsuário,
    getAllUsuários,
    getUsuárioById,
    updateUsuário,
    deleteUsuário,
};