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
        console.log(post.text)
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

module.exports = router