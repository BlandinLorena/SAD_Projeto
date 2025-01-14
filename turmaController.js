const Turmas = require('../models/Turmas');
const Alunos = require('../models/Alunos');

// Get Turmas
const getAllTurmas = async (req, res) => {
    try {
        const turmas = await Turmas.findAll();
        res.status(200).json(turmas);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar Turmas' });
    }
};

// Get Turma por ID
const getTurmaById = async (req, res) => {
    try {
        const { id } = req.params;
        const turma = await Turmas.findByPk(id);
        if (turma) {
            res.status(200).json(turma);
        } else {
            res.status(404).json({ error: 'Turma não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar Turma' });
    }
};

// Update a Turma por ID
const updateTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body; // Supondo que você queira atualizar o nome
        const [updated] = await Turmas.update({ name }, { where: { id } });
        if (updated) {
            const updatedTurma = await Turmas.findByPk(id);
            res.status(200).json(updatedTurma);
        } else {
            res.status(404).json({ error: 'Turma não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao atualizar Turma' });
    }
};

// Delete a Turma por ID
const deleteTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Turmas.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Turma não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao deletar Turma' });
    }
};

// Get Alunos por Turma
const getAlunosByTurmaId = async (req, res) => {
    try {
        const { id } = req.params;
        const turma = await Turmas.findByPk(id, {
            include: {
                model: Alunos,
                attributes: ['matricula', 'name'], 
            },
        });

        if (turma) {
            res.status(200).json(turma.Alunos); 
        } else {
            res.status(404).json({ error: 'Turma não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar Alunos para Turma' });
    }
};

module.exports = {
    getAllTurmas,
    getTurmaById,
    updateTurma,
    deleteTurma,
    getAlunosByTurmaId, 
};