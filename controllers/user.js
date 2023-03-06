const { request, response } = require('express')

const usersGet = (req = request, res = response) => {
    const { name, lastname } = req.query

    res.status(200).json({
        msg: 'get API - controlador',
        name,
        lastname
    })
}

const usersPost = (req = request, res = response) => {
    const body = req.body
    res.status(201).json({
        msg: "post API - controller",
        body,

    })
}

const usersPatch = (req = request, res = response) => {
    res.status(201).json({
        msg: "patch API"
    })
}
const usersDelete = (req = request, res = response) => {
    res.status(200).json({
        msg: "delete API"
    })
}
const usersPut = (req = request, res = response) => {
    const { id } = req.params
    res.status(201).json({
        msg: "put API", id
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersDelete,
    usersPatch,
    usersPut
}
