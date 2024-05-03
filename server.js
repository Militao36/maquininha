const express = require('express')
const cors = require('cors')
const { database } = require('./mysql')
const server = express()

server.use(cors())

server.all('*', async (req, res) => {
  await database.table('webhook')
    .insert({
      request: {
        body: req.body,
        headers: req.headers,
        params: req.params,
        query: req.query,
      }
    })
  return res.status(200).json({})
})

server.listen(3000)