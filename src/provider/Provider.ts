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
/// <reference path="Contracts.ts" />

module provider {

    export class Provider {

        constructor(private repository: repository.IRepository, private logger: loggers.ILogger) {

            this.logger.log('provider: client schema')

            this.repository.clients.schema(() => {
                
                this.logger.log('provider: invoice schema')

                this.repository.invoices.schema(() => {
                    
                    this.logger.log('provider: table initialization complete')
                })
            })
        }

        //----------------------------------------------------
        // getInvoices:
        //----------------------------------------------------
        
        /** lists invoices */
        public getInvoices (request: provider.GetInvoicesRequest, callback: ( response: provider.GetInvoicesResponse) => void) : void {
            
            this.logger.log('provider: get invoices')

            this.repository.invoices.list(request.skip, request.take, request.order, (error:any, invoices:  repository.IInvoice[]) => {
            
                if(error) {
                    
                    this.logger.log('provider: there was an error.')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                callback({success: true, errors: null, invoices: invoices})
            })
        }

        //----------------------------------------------------
        // countInvoices:
        //----------------------------------------------------
        
        /** counts invoices */
        public countInvoices(request: provider.CountInvoicesRequest, callback: (response: provider.CountInvoicesResponse) => void): void {
        
            this.logger.log('provider: count invoices')

            this.repository.invoices.count((error, count) => {
            
                if(error) {
                    
                    this.logger.log('provider: there was an error.')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                callback({success: true, errors: null, count: count})
            })
        }

        //----------------------------------------------------
        // getInvoice:
        //----------------------------------------------------
        
        /** gets a invoice */
        public getInvoice(request: provider.GetInvoiceRequest, callback: ( response: provider.GetInvoiceResponse) => void ) : void {
        
            this.logger.log('provider: get invoice')

            this.repository.invoices.get(request.invoiceid, (error:any, invoice:  repository.IInvoice) => {
            
                if(error) {
                    
                    this.logger.log('provider: there was an error.')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                callback({success: true, errors: null, invoice: invoice})
            })
        }

        //----------------------------------------------------
        // getInvoiceRange:
        //----------------------------------------------------

         /** gets invoices within a specified date range */
        public getInvoiceRange(request: provider.GetInvoiceRangeRequest, callback: (response: provider.GetInvoiceRangeResponse) => void) : void {
        
            this.logger.log('provider: get invoice range')

            var range = { column :'startdate', min : request.startdate, max: request.enddate }

            var order = {column :'created', direction:'desc' }

            this.repository.invoices.range(request.skip, request.take, range, order, (error:any, invoices: repository.IInvoice[]) => {
            
                if(error) {
                    
                    this.logger.log('provider: there was an error.')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                callback({success: true, errors: null, invoices: invoices})
            })

        }

        //----------------------------------------------------
        // updateInvoice:
        //----------------------------------------------------
        
        /** creates a invoice */
        public createInvoice(request: provider.CreateInvoiceRequest, callback: ( response: provider.CreateInvoiceResponse) => void ) : void {

            this.logger.log('provider: create invoice')

            this.logger.log('provider: validating invoice')

            this.repository.clients.get(request.invoice.client, (error, client) => {
            
                if(error) {
                    
                    this.logger.log('provider: there was an error finding the client')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                if(!client) {
                    
                    this.logger.log('provider: client does not exist')

                    callback({success: false, errors: ['client not found']})

                    return
                }

                this.repository.invoices.get(request.invoice.invoiceid, (error, client) => {

                    if(error) {
                    
                        this.logger.log('provider: unable to lookup for existing invoice')

                        callback({success: false, errors: [error.toString()]})

                        return
                    }

                    this.repository.invoices.add(request.invoice, (error) => {

                        if(error) {
                        
                            this.logger.log('provider: unable to add new invoice')

                            callback({success: false, errors: [error.toString()]})

                            return
                        }

                        callback({success: true, errors: null})
                    })
                })
            })
        }

        //----------------------------------------------------
        // updateInvoice:
        //----------------------------------------------------
        
        /** updates a invoice */
        public updateInvoice(request: provider.UpdateInvoiceRequest, callback: ( response: provider.UpdateInvoiceResponse) => void ) : void {

            this.logger.log('provider: update invoice')

            this.logger.log('provider: validating invoice')

            this.repository.clients.get(request.invoice.client, (error, client) => {
            
                if(error) {
                    
                    this.logger.log('provider: there was an error finding the client')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                if(!client) {
                    
                    this.logger.log('provider: client does not exist')

                    callback({success: false, errors: ['client not found']})

                    return
                }

                this.repository.invoices.update(request.invoice, (error) => {

                    if(error) {
                        
                        this.logger.log('provider: there was an error updating the invoice')

                        callback({success: false, errors: [error.toString()]})

                        return
                    }

                    callback({success: true, errors: null})
                })
            })
        }

        //----------------------------------------------------
        // deleteInvoice:
        //----------------------------------------------------
        
        /** deletes a invoice */
        public deleteInvoice(request: provider.DeleteInvoiceRequest, callback: (response: provider.DeleteInvoiceResponse) => void ) : void {
            
            this.logger.log('provider: delete invoice')

            this.repository.invoices.remove(request.invoiceid, (error) => {
            
                if(error) {
                
                    callback({success : false, errors: [error.toString()]})

                    return
                }

                callback({success:true, errors:null})
            })
        }

        //----------------------------------------------------
        // getClients:
        //----------------------------------------------------
        
        /** gets clients */
        public getClients(request: provider.GetClientsRequest, callback: (response: provider.GetClientsResponse) => void) : void {

            this.logger.log('provider: get clients')

            this.repository.clients.list(request.skip, request.take, request.order, (error, clients) => {
            
                if(error) {
                    
                    this.logger.log('provider: there was an error.')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                callback({success: true, errors: null, clients: clients})
            })
        }

        //----------------------------------------------------
        // getClient:
        //----------------------------------------------------

        /** gets client */
        public getClient(request: provider.GetClientRequest, callback: (response: provider.GetClientResponse) => void) : void {

            this.logger.log('provider: get client')

            this.repository.clients.get(request.clientid, (error, client) => {

                if(error) {
                    
                    this.logger.log('provider: there was an error.')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                callback({success: true, errors: null, client : client})
            })
        }

        //----------------------------------------------------
        // updateInvoice:
        //----------------------------------------------------
        
        /** updates a client */
        public updateClient(request: provider.UpdateClientRequest, callback: ( response: provider.UpdateClientResponse) => void ) : void {

            this.logger.log('provider: update client')

            this.logger.log('provider: validating client')

            this.repository.clients.update(request.client, (error) => {

                if(error) {
                        
                    this.logger.log('provider: there was an error updating the client')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                callback({success: true, errors: null})
            })
        }
        //----------------------------------------------------
        // createClient:
        //----------------------------------------------------
        
        /** creates a client */
        public createClient(request: provider.CreateClientRequest, callback: ( response: provider.CreateClientResponse) => void ) : void {

            this.logger.log('provider: create client')

            this.logger.log('provider: validating client')

            this.repository.clients.add(request.client, (error) => {

                if(error) {
                        
                    this.logger.log('provider: there was an error adding the client')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                callback({success: true, errors: null})
            })
        }

        //----------------------------------------------------
        // deleteClient:
        //----------------------------------------------------

        /** deletes a invoice */
        public deleteClient(request: provider.DeleteClientRequest, callback: (response: provider.DeleteClientResponse) => void ) : void {
            
            this.logger.log('provider: delete client')

            this.repository.clients.remove(request.clientid, (error) => {
            
                if(error) {
                
                    callback({success : false, errors: [error.toString()]})

                    return
                }

                callback({success:true, errors:null})
            })
        }

        //--------------------------------------------------------------
        // importData
        //--------------------------------------------------------------

        /** imports data */
        public importData(request: provider.ImportRequest, callback: (response: provider.ImportResponse) => void) : void {
            
            this.logger.log('provider: importing data')

            var data = null
            
            try {

                this.logger.log('provider: parsing json string')

                data = JSON.parse(request.json)
            }
            catch(e) {
                
                callback({success:false, errors: [e.toString()]})

                return
            }

            this.logger.log('provider: grooming invoice dates')

            if(data.invoices) {

                for(var i = 0; i < data.invoices.length; i++) {
            
                    data.invoices[i].created   = new Date(data.invoices[i].created)

                    data.invoices[i].startdate = new Date(data.invoices[i].startdate)

                    data.invoices[i].enddate   = new Date(data.invoices[i].enddate)
                }
            }

            this.logger.log('provider: importing clients')

            util.async.series((data:any, callback:any) => { this.repository.clients.add(data, callback) }, data.clients, (errors) => {

                var success = 0

                var failed  = 0

                for(var i = 0; i < errors.length; i++) {
                    
                    if(!errors[i]) {
                        
                        success += 1

                        continue
                    }

                    failed += 1
                }

                this.logger.log('provider: client import result success: ' + success.toString() + ' failed: ' + failed.toString())

                if(failed > 0) {
                
                    callback({success: false, errors : errors})   
                    
                    return                                     
                }


                this.logger.log('provider: importing invoices')

                util.async.series((data:any, callback:any) => { this.repository.invoices.add(data, callback) }, data.invoices, (errors) => {

                    var success = 0;

                    var failed  = 0;

                    for(var i = 0; i < errors.length; i++) {
                    
                        if(!errors[i]) {
                        
                            success += 1

                            continue
                        }

                        failed += 1
                    }

                    this.logger.log('provider: client import result success: ' + success.toString() + ' failed: ' + failed.toString())

                    if(failed > 0) {
                    
                        callback({success: false, errors : errors})  
                        
                        return                                      
                    }
                                        
                    callback({success: true, errors : null})
                })
            })
        }

        //--------------------------------------------------------------
        // exportData
        //--------------------------------------------------------------

        /** exports all data */

        public exportData(request: provider.ExportRequest, callback: (response: provider.ExportResponse) => void) : void {
            
            this.logger.log('provider: exporting data')

            this.logger.log('provider: counting clients')

            this.repository.clients.count((error, client_count) => {
                
                if(error) {
                
                    this.logger.log('provider: there was an error.')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                this.logger.log('provider: counted ' + client_count.toString() + ' clients')

                this.logger.log('provider: listing clients')

                this.repository.clients.list(0, client_count, {column: 'name', direction: 'desc'}, (error, clients) => {

                    if(error) {
                
                        this.logger.log('provider: there was an error.')

                        callback({success: false, errors: [error.toString()]})

                        return
                    }

                    this.logger.log('provider: counting invoices')

                    this.repository.invoices.count((error, invoice_count) => {

                        if(error) {
                
                            this.logger.log('provider: there was an error.')

                            callback({success: false, errors: [error.toString()]})

                            return
                        }
                                               
                        this.logger.log('provider: counted ' + invoice_count.toString() + ' invoices')

                        this.logger.log('provider: listing invoices')

                        this.repository.invoices.list(0, invoice_count, {column: 'created', direction: 'desc'}, (error, invoices) => {

                            if(error) {
                
                                this.logger.log('provider: there was an error.')

                                callback({success: false, errors: [error.toString()]})

                                return
                            }

                            var data = {

                                clients : clients,

                                invoices  : invoices
                            }

                            callback({success: true,  json: JSON.stringify(data, null, 4)})
                        })
                    })
                })
            })
        }
    }
}