config     = require './config'
bodyParser = require 'body-parser'
express    = require 'express'

app = express()

app.use bodyParser.json({ limit: '100kb' })

port = process.env.PORT or config.http.port
app.listen port, ->
  console.log "server is running on PORT : #{port}"
