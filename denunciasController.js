const Denuncias = require('../models/Denuncias');
const Usuários = require('../models/Usuários');
const Session = require('../models/Session');
const Alunos = require('../models/Alunos');

//  Denuncia
const createDenuncia = async (req, res) => {
    const sessionId = req.headers['session-id']; 
    try {
        const session = await Session.findByPk(sessionId);

        if (!session) {
            return res.status(401).json({ error: 'Sessão não encontrada' });
        }

        const usuarioId = session.userId;

        const { description, alunoId } = req.body;
        const aluno = await Alunos.findByPk(alunoId);
        const turmaid = aluno.turmaId;

        const newDenuncia = await Denuncias.create({ description, alunoId, usuarioId, turmaid });
        res.status(201).json(newDenuncia);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao criar Denúncia', message: error.message });
    }
};

const getDenunciasForUser = async (req, res) => {
    const sessionId = req.headers['session-id'];

    try {
        const session = await Session.findByPk(sessionId);
        if (!session) {
            return res.status(401).json({ error: 'Sessão não encontrada' });
        }

        const user = await Usuários.findByPk(session.userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        let denuncias;
        if (user.isAdmin) {
            denuncias = await Denuncias.findAll({ where: { turmaid: user.turmaid } });
        } else {
            denuncias = await Denuncias.findAll({ where: { usuarioId: user.id } });
        }

        res.status(200).json(denuncias);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar Denúncias', message: error.message });
    }
};

// Get Denuncias
const getAllDenuncias = async (req, res) => {
    try {
        const denuncias = await Denuncias.findAll();
        res.status(200).json(denuncias);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar Denúncias' });
    }
};

// Get Denuncia por ID
const getDenunciaById = async (req, res) => {
    try {
        const { id } = req.params;
        const denuncia = await Denuncias.findByPk(id);
        if (denuncia) {
            res.status(200).json(denuncia);
        } else {
            res.status(404).json({ error: 'Denúncia não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar Denúncia' });
    }
};

// Update Denuncia por ID
const updateDenuncia = async (req, res) => {
    const sessionId = req.headers['session-id']; 

    try {
        const session = await Session.findByPk(sessionId);
        if (!session) {
            return res.status(401).json({ error: 'Sessão não encontrada' });
        }

        const user = await Usuários.findByPk(session.userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ error: 'Acesso negado: Apenas administradores podem atualizar Denúncias' });
        }

        const { id } = req.params;
        const { description } = req.body; 
        const [updated] = await Denuncias.update({ description }, { where: { id } });
        if (updated) {
            const updatedDenuncia = await Denuncias.findByPk(id);
            res.status(200).json(updatedDenuncia);
        } else {
            res.status(404).json({ error: 'Denúncia não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao atualizar Denúncia' });
    }
};  

// Delete a Denuncia por ID
const deleteDenuncia = async (req, res) => {
    const sessionId = req.headers['session-id'];

    try {
        const session = await Session.findByPk(sessionId);
        if (!session) {
            return res.status(401).json({ error: 'Sessão não encontrada' });
        }

        const user = await Usuários.findByPk(session.userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Checar administrador
        if (!user.isAdmin) {
            return res.status(403).json({ error: 'Acesso negado: Apenas administradores podem deletar Denúncias' });
        }

        const { id } = req.params;
        const deleted = await Denuncias.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Denúncia não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao deletar Denúncia' });
    }
};

module.exports = {
    createDenuncia,
    getAllDenuncias,
    getDenunciaById,
    updateDenuncia,
    deleteDenuncia,
    getDenunciasForUser
};