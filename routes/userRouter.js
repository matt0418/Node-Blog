const express = require('express')

const Users = require('../data/helpers/userDb')

const router = express.Router()

function upperCaseName(req, res, next) {
    req.body.name = req.body.name.toUpperCase()
    next()
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req.query)
        return res.status(200).json(users)
    } catch(error) {
        console.log(error)
        res.status(500).json({
            error: "The Users information could not retrieved"
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await Users.getById(id)
        if (user) {
            return res.status(200).json(user)
        } else {
            res.status(404).json({ message: "User with this ID could not be found" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Error retrieving User"})
    }
})

router.get('/:id/posts', async (req, res) => {
    const id = req.params.id
    try {
        const userPosts = await Users.getUserPosts(id)
        if (userPosts.length > 0) {
            return res.status(200).json(userPosts)
        } else {
            res.status(404).json({ message: "No posts for this user exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Error retrieving posts" })
    }
})

router.post('/', upperCaseName, async (req, res) => {
    try {
        const user = await Users.insert(req.body)
        res.status(201).json(user)
    } catch(error) {
        console.log(error)
        res.status(500).json({
            error: "Error adding a user"
        })
    }
})

router.put('/:id', upperCaseName, async (req, res) => {
    const id = req.params.id
    const {name} = req.body
    try {
        const user = await Users.update(id, {name})
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "No user with this ID exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "There was an error updating the user" })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await Users.remove(id)
        if (deleted) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({ message: "No user with this ID exists" })
        } 
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error removing this user" })
    }
})




module.exports = router