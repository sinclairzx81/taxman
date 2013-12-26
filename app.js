//----------------------------------------
// configure express
//----------------------------------------

var express = require('express')

var app     = express()

app.listen(process.env.PORT || 5000)

//----------------------------------------
// configure business
//----------------------------------------

var taxman     = require('./bin/index.js')

var logger     = new taxman.loggers.ConsoleLogger()

var repository = new taxman.repository.SqliteRepository()

var server     = new taxman.Server(app, repository, logger)

