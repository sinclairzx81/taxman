﻿/*--------------------------------------------------------------------------

The MIT License (MIT)

Copyright (c) 2013 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

/// <reference path="references.ts" />

//-------------------------------------------------------
// util
//-------------------------------------------------------
/// <reference path="util/Numeric.ts" />
/// <reference path="util/Async.ts" />
/// <reference path="validation/index.ts" />

//-------------------------------------------------------
// config
//-------------------------------------------------------
/// <reference path="config/config.ts" />

//-------------------------------------------------------
// loggers
//-------------------------------------------------------

/// <reference path="loggers/ConsoleLogger.ts" />
/// <reference path="loggers/NullLogger.ts" />

//-------------------------------------------------------
// repositories
//-------------------------------------------------------

/// <reference path="repository/sqlite/SqliteRepository.ts" />

//-------------------------------------------------------
// reports
//-------------------------------------------------------

/// <reference path="reports/PhantomNetReporter.ts" />

//-------------------------------------------------------
// provider
//-------------------------------------------------------

/// <reference path="provider/Provider.ts" />

//-------------------------------------------------------
// servers
//-------------------------------------------------------

/// <reference path="Server.ts" />

module.exports.util       = util

module.exports.config     = config

module.exports.validation = validation

module.exports.loggers    = loggers

module.exports.repository = repository

module.exports.reports    = reports

module.exports.provider   = provider

module.exports.Server     = Server