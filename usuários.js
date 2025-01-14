// routes/usuários.js
const express = require('express');
const router = express.Router();
const {
    createUsuário,
    getAllUsuários,
    getUsuárioById,
    updateUsuário,
    deleteUsuário,
} = require('../controllers/usuáriosController');

// Define your routes
router.post('/', createUsuário); // Create a new Usuário
// router.get('/', getAllUsuários); // Get all Usuários
// router.get('/:id', getUsuárioById); // Get an Usuário by ID
// router.put('/:id', updateUsuário); // Update an Usuário by ID
// router.delete('/:id', deleteUsuário); // Delete an Usuário by ID

module.exports = router;