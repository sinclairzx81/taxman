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

/// <reference path="../../references.ts" />
/// <reference path="../../loggers/ILogger.ts" />
/// <reference path="../IRepository.ts" />
/// <reference path="../ITable.ts" />
/// <reference path="SqliteClientTable.ts" />
/// <reference path="SqliteInvoiceTable.ts" />

module repository {

    export class SqliteRepository implements repository.IRepository {
        
        public db        : any

        public clients   : ITable<repository.IClient>;

        public invoices  : ITable<repository.IInvoice>;

        constructor(public filename: string, public logger: loggers.ILogger) {

            this.db        = new sqlite3.Database(this.filename)

            this.clients   = new repository.SqliteClientTable (this.db, this.logger)

            this.invoices  = new repository.SqliteInvoiceTable(this.db, this.logger)
        }     
    }
}