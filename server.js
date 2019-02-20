const express = require('express')

const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const server = express()

server.use(express.json())
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
    res.send(`
        <h1>Node Notes</h1>
    `)
})

module.exports = server