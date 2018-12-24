'use strict'

const express = require('express')


exports.initWebServer = () => {
    const server = express()
    server.on('error', console.error)

    // parse application/x-www-form-urlencoded
    server.use(express.urlencoded({ extended: false }))
    // parse application/json
    server.use(express.json())
    server.all('/', (_, res) => res.send('Welcome to Functional RESTful CRUD service'))
    return server
}
