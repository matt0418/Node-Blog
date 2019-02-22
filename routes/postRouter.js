const express = require('express')
const Posts = require('../data/helpers/postDb')
const router = express.Router()




router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query)
        return res.status(200).json(posts)
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error retrieving the posts" })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await Posts.getById(id)
        if (typeof post.text === "string") {
            return res.status(200).json(post)
        } else {
            res.status(404).json({ message: "There are no posts associated with this ID" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error retrieving the posts" })
    }
})

router.post('/', async (req, res) => {
    const {text, user_id} = req.body
    if (!text || !user_id) {
        return(
            res.send({ status: 400, errorMessage: "Please provide text and user id" })
        )
    } else {
        try {
            const post = await Posts.insert(req.body)
            res.status(201).json(post)
        } catch(error) {
            console.log(error)
            res.status(500).json({ error: "There was an error adding this post" })
        }
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const {text} = req.body
    try {
        const post = await Posts.update(id, {text})
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ error: "No post with this ID exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an issue updating this post" })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await Posts.remove(id)
        if (deleted) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({ message: "No post with this ID exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error deleting this post" })
    }
})


module.exports = router