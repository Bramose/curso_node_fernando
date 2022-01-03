const { response } = require("express")

const isAdminRol = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { rol, name } = req.user
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            message: `El usuario ${name} no tiene permisos suficientes para realizar esta acción`
        })
    }
    next()
}

const hasRol = (...roles) => {
    console.log({roles})
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                message: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                message: `El servicio requiere uno de los siguientes roles ${ roles.join(', ') }.`
            })
        }
        next()
    }
}

module.exports = {
    isAdminRol,
    hasRol
}