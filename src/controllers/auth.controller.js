const prisma = require('../config/prisma');

const login = async (req, res) => {

    try {

        const {
            usuario,
            contrasena
        } = req.body;

        const usuarioEncontrado = await prisma.usuarios.findFirst({
            where: {
                usuario,
                contrasena
            }
        });

        if (!usuarioEncontrado) {

            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        res.json({
            ok: true,
            usuario: {
                id: usuarioEncontrado.id,
                usuario: usuarioEncontrado.usuario,
                tipo: usuarioEncontrado.tipo
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            ok: false,
            mensaje: 'Error en login'
        });
    }
};

module.exports = {
    login
};