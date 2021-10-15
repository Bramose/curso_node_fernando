const Role = require('../models/role')
const Users = require('../models/users')

const isValidRole = async (rol = '') =>
{
    const existeRol = await Role.findOne({ name: rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExist = async (email = "") => {
    const exist = await Users.findOne({ email })
    if (exist) {
        throw new Error(`El correo: ${email} ya esta registrado en la BD`)
    }
}

const userIdExist = async (id) => {
    const existUser = await Users.findById(id)
    if (!existUser) {
        throw new Error(`El id: ${id} no existe`)
    }
}

module.exports = {
    isValidRole,
    emailExist,
    userIdExist
}