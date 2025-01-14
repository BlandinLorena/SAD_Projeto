// routes/turmas.js
const express = require('express');
const {
    getAllTurmas,
    getTurmaById,
    updateTurma,
    deleteTurma,
    getAlunosByTurmaId, // Import the new function
} = require('../controllers/turmaController');

const router = express.Router();

// Get all Turmas
router.get('/', getAllTurmas);

// // Get a Turma by ID
router.get('/:id', getTurmaById);

// Get all Alunos for a specific Turma
router.get('/:id/alunos', getAlunosByTurmaId); // New route for getting Alunos by Turma ID

// Update a Turma by ID
// router.put('/:id', updateTurma);

// // Delete a Turma by ID
// router.delete('/:id', deleteTurma);

module.exports = router;