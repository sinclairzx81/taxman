/*--------------------------------------------------------------------------

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
/// <reference path="../IClient.ts" />

module repository {

    export class SqliteClientTable implements repository.ITable<repository.IClient> {

        constructor(public db: any, public logger: loggers.ILogger) {
        
        }

        public schema (callback?: (error: any) => void) : void {

            var sql = 'create table if not exists client  ( name        TEXT,' + 
            
                                                          ' slug        TEXT,' + 
            
                                                          ' email       TEXT,'  +  
            
                                                          ' phone       TEXT,'  + 
            
                                                          ' website     TEXT,' +                                           
            
                                                          ' address     TEXT,'         +  
            
                                                          ' comment     TEXT,'         +
            
                                                          ' primary key(name) );'
            
            this.db.run(sql, (error) => {

                if(callback) {
                    
                    callback(error)
                }
            })
        }

        public count  (callback?:(error: any, count:number) => void) : void {
        
            var sql = 'select count(*) from client'

            this.db.get(sql, (error, row) => {
                
                if(callback) {
                    
                    callback(error, row['count(*)'])
                }
            })              
        }

        public add    (record: repository.IClient, callback?: (error:any) => void) : void {
            
            var sql = 'insert into client (name, slug, email, phone, website, address, comment) values (?, ?, ?, ?, ?, ?, ?)'
            
            this.db.run(sql, record.name, record.slug, record.email, record.phone, record.website, record.address, record.comment, (error) => {
                
                if(callback){
                    
                    callback(error)
                }
            })        
        }

        public update (record:repository.IClient,  callback?:(error:any) => void) : void {
        
            var sql = 'update client set name = ?, email = ?, phone = ?, website = ?, address = ?, comment = ? where slug = ?'

            this.db.run(sql, record.name, record.email, record.phone, record.website, record.address, record.comment, record.slug, (error) => {
                
                if(callback){
                    
                    callback(error)
                }
            })        
        }
        
        public remove (id:string, callback?:(error:any) => void) : void {
        
            var sql = 'delete from client where slug = ?'

            this.db.run(sql, id, (error, row) => {
                
                if(callback) {
                    
                    callback(error)
                }
            })           
        }
        
        public get    (id:string, callback?:(error:any, record: repository.IClient) => void) : void {
        
            var sql = 'select * from client where slug = ?'

            this.db.get(sql, id, (error, row) => {
                
                if(callback) {
                    
                    callback(error, this.parse(row))
                }
            })    
        }
        
        public list   (skip: number, take: number, order?: {column:string; direction:string;}, callback?:(error:any, items: repository.IClient[]) => void) : void {
            
            order = order || { column: 'name', direction: 'asc' }

            var sql = 'select * from client order by ' + this.makesafe(order.column) + ' ' + this.makesafe(order.direction) +  ' limit ?, ?'

            this.db.all(sql, skip, take, (error, rows) => {
                
                if(callback) {
                    
                    if(!rows) {

                        callback(null, [])

                        return
                    }

                    for(var i = 0; i < rows.length; i++) {
                    
                        rows[i] = this.parse(rows[i])
                    }

                    callback(error, <repository.IClient[]>rows)
                }
            })               
        }
        
        public find (query: string, skip: number, take: number, order?: {column:string; direction:string;}, callback?:(error:any, items: repository.IClient[]) => void) : void {
        
            order = order || { column: 'name', direction: 'asc' }

            throw Error('not implemented')
        }

        private parse(record: any) : repository.IClient {
        
            return <repository.IClient>record
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