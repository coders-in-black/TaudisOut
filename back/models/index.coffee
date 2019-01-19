config    = require '../config'
mongoose  = require "mongoose"
Schema    = mongoose.Schema
Promise   = require 'bluebird'

mongoose.Promise = Promise

cnx = new Promise (resolve, reject) ->

  mongoose.connect config.db.url, useNewUrlParser: true,
    (err, _cnx) ->
      return reject err if err
      resolve _cnx

module.exports =
  _mongoose_connection: cnx
  Diagnostic:     require './diagnostic.model'
