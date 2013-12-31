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
/// <reference path="../ITable.ts" />
/// <reference path="../IInvoice.ts" />

module repository {

    export class SqliteInvoiceTable implements repository.ITable<repository.IInvoice> {
    
        constructor(public db: any, public logger: loggers.ILogger) {
            
        }

        public schema (callback?: (error: any) => void) : void {

            this.logger.log('sqlite: setting invoice schema')

            var sql = 'create table if not exists invoice  ( invoiceid   TEXT,' +

                                                          '  company     TEXT,' + 

                                                          '  created     NUMERIC,'     +  
            
                                                          '  startdate   NUMERIC,'     + 
            
                                                          '  enddate     NUMERIC,'     + 
            
                                                          '  hours       REAL,'         +
            
                                                          '  rate        REAL,'         +
            
                                                          '  gstrate     REAL,'         +
            
                                                          '  sent        INTEGER,'          +
            
                                                          '  paid        INTEGER,'          +
            
                                                          '  comment     TEXT,'         +
            
                                                          '  primary key(invoiceid));'

            this.db.run(sql, (error) => {

                this.logger.log('sqlite: setting invoice schema complete')

                if(callback) {
                    
                    callback(error)
                }
            })
        }

        public count  (callback?:(error: any, count:number) => void) : void {
            
            this.logger.log('sqlite: invoice count')

            var sql = 'select count(*) from invoice'

            this.db.get(sql, (error, row) => {

                if(callback) {

                    if(error) {
                        
                        this.logger.log('sqlite: invoice count error')

                        callback(error, 0)

                        return
                    }
                                   
                    try {
                    
                        var count = row['count(*)']

                        callback(null, count)

                    } catch(e) {
                    
                        callback(e, 0)
                    }
                }
            })              
        }

        public add    (record: repository.IInvoice,  callback?:(error:any) => void) : void {
            
            this.logger.log('sqlite: invoice add')

            var sent = record.sent ? 1 : 0

            var paid = record.paid ? 1 : 0

            var sql  = 'insert into invoice (invoiceid, company, created, startdate, enddate, hours, rate, gstrate, sent, paid, comment ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

            this.db.run(sql, record.invoiceid, record.company, record.created, record.startdate, record.enddate, record.hours, record.rate, record.gstrate, sent, paid, record.comment, (error) => {
                
                this.logger.log('sqlite: invoice add complete')

                if(callback) {
                
                    callback(error)
                }
            })
        }

        public update (record:repository.IInvoice,  callback?:(error:any) => void) : void {
        
            this.logger.log('sqlite: invoice update')

            var sent = record.sent ? 1 : 0

            var paid = record.paid ? 1 : 0

            var sql = 'update invoice set company = ?, created = ?, startdate = ?, enddate = ?, hours = ?, rate = ?, gstrate = ?, sent = ?, paid = ?, comment = ? where invoiceid = ?'

            this.db.run(sql, record.company, record.created, record.startdate, record.enddate, record.hours, record.rate, record.gstrate, sent, paid, record.comment, record.invoiceid, (error) => {
                
                this.logger.log('sqlite: invoice update complete')

                if(callback) {
                
                    callback(error)
                }
            })     
        }
        
        public remove (id:string, callback?:(error:any) => void) : void {
            
            this.logger.log('sqlite: invoice remove')

            var sql = 'delete from invoice where invoiceid = ?'

            this.db.run(sql, id, (error, row) => {
                
                this.logger.log('sqlite: invoice complete')

                if(callback) {
                    
                    callback(error)
                }
            })           
        }
        
        public get    (id:string, callback?:(error:any, record: repository.IInvoice) => void) : void {
            
            this.logger.log('sqlite: invoice get')

            var sql = 'select * from invoice where invoiceid = ?'

            this.db.get(sql, id, (error, row) => {
                
                this.logger.log('sqlite: invoice get complete')

                if(callback) {
                    
                    if(row) {
                    
                        row = this.parse(row)
                    }

                    callback(error, row)
                }
            })    
        }
        
        public list   (skip: number, take: number, order?: {column:string; direction:string;}, callback?:(error:any, items: repository.IInvoice[]) => void) : void {
            
            this.logger.log('sqlite: invoice list')

            order = order || { column: 'id', direction: 'asc' }

            var sql = 'select * from invoice order by ' + this.makesafe(order.column) + ' ' + this.makesafe(order.direction) + ' limit ?, ?'
            
            this.db.all(sql, skip, take, (error, rows) => {
                
               this.logger.log('sqlite: invoice list complete')

                if(callback) {

                    if(!rows) {
                        
                        callback(error, [])

                        return
                    }

                    for(var i = 0; i < rows.length; i++) {
                        
                        if(rows[i]) {
                    
                            rows[i] = this.parse(rows[i])
                        }                        
                    }
                     
                    callback(error, <repository.IInvoice[]>rows)
                }
            })               
        }
        
        public find   (query: string, skip: number, take: number, order? : {column:string; direction:string;} , callback?:(error:any, items: repository.IInvoice[]) => void) : void {
            
            this.logger.log('sqlite: invoice find')

            order = order || { column: 'id', direction: 'asc' }

            throw Error('not implemented')
        }  
        
        private parse(record: any) : repository.IInvoice {

            record.created   = new Date(record.created)

            record.startdate = new Date(record.startdate)

            record.enddate   = new Date(record.enddate)

            record.sent      = record.sent == 1 ? true : false

            record.paid      = record.paid == 1 ? true : false

            return <repository.IInvoice>record
        }
        
        private makesafe(val:string) : string {

            /* why no escape :( ? */

            if(val.indexOf(' ')   != -1 ||
                
               val.indexOf('\n')  != -1 ||

               val.indexOf('\t')  != -1 ||

               val.indexOf('\'')  != -1 ||

               val.indexOf('\"')  != -1) {

                return ''
            }
            return val
        }           
    }
}