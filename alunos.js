// routes/alunos.js
const express = require('express');
const {
    getAllAlunos,
    getAlunoById,
    updateAluno,
    deleteAluno,
} = require('../controllers/alunosController');

const router = express.Router();

// Get all Alunos
router.get('/', getAllAlunos);

// Get an Aluno by ID
router.get('/:id', getAlunoById);

// Update an Aluno by ID
// router.put('/:id', updateAluno);

// // Delete an Aluno by ID
// router.delete('/:id', deleteAluno);

module.exports = router;