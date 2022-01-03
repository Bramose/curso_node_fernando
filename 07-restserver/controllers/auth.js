const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const { emailExist } = require('../helpers/db-validators')
const users = require('../models/users')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async(req, res = response) => {
    
    const { email, password } = req.body

    try {

        // Verificar si el email existe
        const usuario = await users.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                message: 'Usuario / Password no son correctos - correo'
            })
        }

        // Si el usuario está activo
        if (!usuario.status) {
            return res.status(400).json({
                message: 'Usuario desactivado'
            })
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                message: 'Usuario / Password no son correctos - Password incorrecto'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status().json({
            message: "Hable con el administrador"
        })
    }
    
}

module.exports = {
    login
}