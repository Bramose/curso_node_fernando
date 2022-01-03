const { response } = require("express")
const jwt = require("jsonwebtoken")
const Users = require("../models/users")

const validarJWT =async (req, res=response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            message: 'No hay token en la petición'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        user = await Users.findById(uid)

        if (!user) {
            return res.status(401).json({
                message: 'Token no valido - usuario no existe en base de datos'
            })
        }

        if (!user.status) {
            return res.status(401).json({
                message: 'Token no valido - usuario con estado en false'
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log({error})
        res.status(401).json({
            message: 'Token no válido'
        })
    }
    next()
}

module.exports = {
    validarJWT
}