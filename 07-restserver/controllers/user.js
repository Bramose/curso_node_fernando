const { response } = require('express')

const userGet = (req, res = response) => {
    const { q, nombre = "No name", apiKey, page = 1, limit } = req.query
    res.json({
        msg: "get API controlador",
        q,
        nombre,
        apiKey,
        page,
        limit
    })
}

const userPut = (req, res = response) => {

    const id = req.params.id

    const body = req.body

    res.json({
        msg: "put API",
        id,
        body
    })
}

const userPost = (req, res = response) => {
    const body = req.body
    res.json({
        msg: "post API",
        body
    })
}

const userDelete = (req, res = response) => {
    res.json({
        msg: "delete API"
    })   
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