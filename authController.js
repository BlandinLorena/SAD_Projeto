const Usuários = require('../models/Usuários');
const Session = require('../models/Session');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Usuários.findOne({ where: { username, password } });

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
        const session = await Session.create({ userId: user.id });

        res.status(200).json({ message: 'Login bem-sucedido', sessionId: session.id });
    } catch (error) {
        res.status(500).json({ error: 'Falha ao fazer login' });
    }
};

const logout = async (req, res) => {
    const sessionId = req.headers['session-id'];

    try {
        const session = await Session.findByPk(sessionId);

        if (!session) {
            return res.status(404).json({ error: 'Sessão não encontrada' });
        }

        await session.destroy();

        res.status(200).json({ message: 'Logout bem-sucedido' });
    } catch (error) {
        res.status(500).json({ error: 'Falha ao fazer logout' });
    }
};

module.exports = {
    login,
    logout
};