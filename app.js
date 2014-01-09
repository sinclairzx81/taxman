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

var config     = taxman.config.load('./config.json')

var logger     = new taxman.loggers.ConsoleLogger()

var repository = new taxman.repository.SqliteRepository(config.database.filename, logger)

var provider   = new taxman.provider.Provider(repository, logger)

var mailer     = new taxman.mailing.SmtpClient(config.mailing.options, logger)

var reporter   = new taxman.reports.PhantomPDFReporter(config.reporter.endpoint)

//var reporter   = new taxman.reports.HTMLReporter()

var security   = new taxman.security.SingleUserSecurity(config.security)

//var security   = new taxman.security.NullSecurity(config.security)

var server     = new taxman.Server(app, security, provider, reporter, logger)


