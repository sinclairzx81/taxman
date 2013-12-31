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

    var fs = require('fs')

    fs.readFile('c:/input/invoices.json', 'utf8', function(err, json){

        //console.log(json)

        provider.Import({json: json}, function(results) {

            console.log(JSON.stringify(results, null, 4))

            //provider.Export({}, function(data) {
    
            //    fs.writeFile('c:/input/invoices.json', data, function () {

            //        console.log('done')
            //    })
            //})            
        })
    })

}, 1500)



