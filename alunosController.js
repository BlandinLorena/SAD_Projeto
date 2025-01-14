// controllers/alunosController.js
const Alunos = require('../models/Alunos');

// Get all Alunos
const getAllAlunos = async (req, res) => {
    try {
        const alunos = await Alunos.findAll();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Alunos' });
    }
};

// Get Aluno por ID
const getAlunoById = async (req, res) => {
    try {
        const { id } = req.params;
        const aluno = await Alunos.findByPk(id);
        if (aluno) {
            res.status(200).json(aluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Aluno' });
    }
};

// Update Aluno por ID
const updateAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body; 
        const [updated] = await Alunos.update({ name }, { where: { id } });
        if (updated) {
            const updatedAluno = await Alunos.findByPk(id);
            res.status(200).json(updatedAluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Aluno' });
    }
};

// Delete Aluno por ID
const deleteAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Alunos.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Aluno' });
    }
};

module.exports = {
    getAllAlunos,
    getAlunoById,
    updateAluno,
    deleteAluno,
};