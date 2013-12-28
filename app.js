//----------------------------------------
// configure express
//----------------------------------------

var express = require('express')

var app     = express()

app.listen(process.env.PORT || 5000)

console.log('server listening on port ' + (process.env.PORT || 5000))

//----------------------------------------
// configure taxman
//----------------------------------------

var taxman     = require('./bin/index.js')

var logger     = new taxman.loggers.ConsoleLogger()

var repository = new taxman.repository.SqliteRepository('c:/input/database.sql', logger)

var provider   = new taxman.providers.Provider(repository, logger)

var server     = new taxman.Server(app, provider, logger)

//----------------------------------------
// bootstrap
//----------------------------------------

setTimeout(function() {

    //var fs = require('fs')

    //fs.readFile('c:/input/invoices.json', 'utf8', function(err, data){

    //    provider.importData(data, function(err, results) {

    //        console.log(err)

    //        console.log(results)
    //    })
    //})

}, 500)