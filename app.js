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

var provider   = new taxman.provider.Provider(repository, logger)

var reporter   = new taxman.reports.PhantomNetReporter("http://phantom.interactive.net.nz")

var server     = new taxman.Server(app, provider, reporter, logger)

//----------------------------------------
// bootstrap
//----------------------------------------

setTimeout(function() {

    var fs = require('fs')

    fs.readFile('c:/input/invoices.json', 'utf8', function(err, json) {

        provider.importData({json: json}, function(results) {

            provider.exportData({}, function(data) {
                
                fs.writeFile('c:/input/invoices3.json', data.json, function () {

                    console.log('done')
                })
            })            
        })
    })

}, 1500)

console.log('taxman')

