const { response, request } = require('express')
const Users = require('../models/users')
const bcrypt = require('../helpers/password-bcrypt')


const userGet = async(req, res = response) => {
    // const { q, nombre = "No name", apiKey, page = 1, limit } = req.query
    const { limite = 5, desde = 0 } = req.query
    const query = { status: true }

    const [users, total] = await Promise.all([
        Users.find(query)
        .skip(Number(desde))
            .limit(Number(limite)),
        Users.countDocuments(query)
    ])
    
    res.json({
        total,
        users
    })
}

const userPut = async(req, res = response) => {

    const { id } = req.params
    const { _id, password, google, ...resto } = req.body

    if (password) {
        resto.password = bcrypt(password)
    }

    const user = await Users.findByIdAndUpdate(id, resto) 

    res.json(user)
}

const userPost = async (req, res = response) => {
    const { name, email, rol, password } = req.body
    const user = new Users({ name, email, rol, password })

    // Encriptar la contraseña
    user.password = bcrypt(password)

    await user.save()

    res.json(user)
}

const userDelete = async(req, res = response) => {
    const { id } = req.params
    // Eliminar el documento fisicamente
    // const user = await Users.findByIdAndDelete(id)
    const user = await Users.findByIdAndUpdate(id, { status: false })
    const userAuthenticated = req.user
    res.json({user, userAuthenticated})   
}

const userPatch = (req, res = response) => {
    res.json({
        msg: "patch API"
    })    
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}