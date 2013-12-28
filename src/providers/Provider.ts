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

/// <reference path="../references.ts" />
/// <reference path="../loggers/ILogger.ts" />
/// <reference path="../repository/IRepository.ts" />
/// <reference path="../util/Async.ts" />
/// <reference path="Validator.ts" />

module providers {

    export class Provider {
        
        private validator: providers.Validator;

        constructor(public repository: repository.IRepository, public logger: loggers.ILogger) {

            this.validator = new providers.Validator()
            
            this.logger.log('provider: company schema')

            this.repository.companies.schema(() => {
                
                this.logger.log('provider: invoice schema')

                this.repository.invoices.schema(() => {
                    
                    this.logger.log('provider: table initialization complete')
                })
            })
        }

        //----------------------------------------------------
        // invoices:
        //----------------------------------------------------

        public get_invoices (callback: ( invoices: repository.IInvoice[]) => void ) : void {
        
            this.repository.invoices.list(0, 1000, {column: 'created', direction: 'desc'}, (err:any, invoices:  repository.IInvoice[]) => {
            
                callback(invoices)
            })
        }

        public get_invoice(id:string, callback: ( invoice: repository.IInvoice )=>void ) : void {
        
            this.repository.invoices.get(id, (err:any, invoice:  repository.IInvoice) => {
            
                callback(invoice)
            })
        }

        public update_invoice(invoice: repository.IInvoice, callback: (success:boolean, errors: string[]) => void ) : void {

            this.validator.validate_invoice(invoice, (errors) => {
            
                if(errors.length > 0) {
                
                    callback(false, errors)

                    return
                }
                
                this.repository.companies.get(invoice.company, (error, company) => {
            
                    if(error) {
                
                        callback(false, [error.toString()])

                        return
                    }

                    if(!company) {
                
                        callback(false, ['company not found'])

                        return
                    }

                    this.repository.invoices.update(invoice, (error) => {
                
                        if(error) {
                    
                            callback(false, [error.toString()])

                            return
                        }

                        callback(true, null)
                    })
                })

            })

        }

        //----------------------------------------------------
        // companies:
        //----------------------------------------------------
        
        public get_companies(callback: ( companies: repository.ICompany[] )=>void ) : void {

            this.repository.companies.list(0, 1000, null, (error, companies) => {
            
                callback(companies)
            })
        }

        //--------------------------------------------------------------
        // data migration
        //--------------------------------------------------------------

        public import_data(json:string, callback:(results:any) => void ) : void { 
            
            this.logger.log('provider: importing data')

            var data = JSON.parse(json)

            for(var i = 0; i < data.invoices.length; i++) {
            
                data.invoices[i].created   = new Date(data.invoices[i].created)

                data.invoices[i].startdate = new Date(data.invoices[i].startdate)

                data.invoices[i].enddate   = new Date(data.invoices[i].enddate)
            }

            util.async.series((data:any, callback:any) => { this.repository.companies.add(data, callback) }, data.companies, (results) => {

                util.async.series((data:any, callback:any) => { this.repository.invoices.add(data, callback) }, data.invoices, (results) => {

                    callback(results)
                })
            })
        }

        public export_data(callback: (json:string) => void) : void {
            
            this.logger.log('provider: exporting data')

            this.repository.companies.count((err, company_count) => {
                
                this.repository.companies.list(0, company_count, {column: 'name', direction: 'desc'}, (error, companies) => {
                
                    this.repository.invoices.count((err, invoice_count) => {
                    
                        this.repository.invoices.list(0, invoice_count, {column: 'created', direction: 'desc'}, (error, invoices) => {

                            var data = {

                                companies : companies,

                                invoices  : invoices
                            }

                            callback(JSON.stringify(data, null, 4))
                        })
                    })
                })
            })
        }
    }
}