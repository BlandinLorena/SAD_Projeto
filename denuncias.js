const express = require('express');
const router = express.Router();
const {
    createDenuncia,
    getAllDenuncias,
    getDenunciaById,
    updateDenuncia,
    deleteDenuncia,
    getDenunciasForUser ,
} = require('../controllers/denunciasController');

// Define your routes
router.post('/', createDenuncia);
router.get('/', getDenunciasForUser ); // Get Denuncias for user
// router.get('/:id', getDenunciaById);
// router.put('/:id', updateDenuncia); // Update Denuncia
// router.delete('/:id', deleteDenuncia); // Delete Denuncia


module.exports = router;