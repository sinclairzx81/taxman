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

/// <reference path="../references.ts" />
/// <reference path="../loggers/ILogger.ts" />
/// <reference path="../repository/IRepository.ts" />
/// <reference path="../util/Async.ts" />
/// <reference path="Contracts.ts" />

module providers {

    export class Provider {
        
        constructor(private repository: repository.IRepository, private logger: loggers.ILogger) {
            
            this.logger.log('provider: company schema')

            this.repository.companies.schema(() => {
                
                this.logger.log('provider: invoice schema')

                this.repository.invoices.schema(() => {
                    
                    this.logger.log('provider: table initialization complete')
                })
            })
        }

        //----------------------------------------------------
        // GetInvoices:
        //----------------------------------------------------
        
        public GetInvoices (request: providers.GetInvoicesRequest, callback: ( response: providers.GetInvoicesResponse) => void) : void {
            
            this.logger.log('provider: GetInvoices(' + JSON.stringify(request) + ')')

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
        // CountInvoices:
        //----------------------------------------------------
        public CountInvoices(request: providers.CountInvoicesRequest, callback: (response: providers.CountInvoicesResponse) => void): void {
        
            this.logger.log('provider: CountInvoices(' + JSON.stringify(request) + ')')

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
        // GetInvoice:
        //----------------------------------------------------
        
        public GetInvoice(request: providers.GetInvoiceRequest, callback: ( response: providers.GetInvoiceResponse) => void ) : void {
        
            this.logger.log('provider: GetInvoice(' + JSON.stringify(request) + ')')

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
        // UpdateInvoice:
        //----------------------------------------------------
        
        public UpdateInvoice(request: providers.UpdateInvoiceRequest, callback: ( response: providers.UpdateInvoiceResponse) => void ) : void {

            this.logger.log('provider: UpdateInvoice(' + JSON.stringify(request) + ')')

            this.repository.companies.get(request.invoice.company, (error, company) => {
            
                if(error) {
                    
                    this.logger.log('provider: there was an error finding the company')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                if(!company) {
                    
                    this.logger.log('provider: company does not exist')

                    callback({success: false, errors: ['company not found']})

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
        // DeleteInvoice:
        //----------------------------------------------------
        
        public DeleteInvoice(request: providers.DeleteInvoiceRequest, callback: (response: providers.DeleteInvoiceResponse) => void ) : void {
            
            this.logger.log('provider: DeleteInvoice(' + JSON.stringify(request) + ')')

            this.repository.invoices.remove(request.invoiceid, (error) => {
            
                if(error) {
                
                    callback({success : false, errors: [error.toString()]})

                    return
                }

                callback({success:true, errors:null})
            })
        }

        //----------------------------------------------------
        // GetCompanies:
        //----------------------------------------------------
        
        public GetCompanies(request: providers.GetCompaniesRequest, callback: (response: providers.GetCompaniesResponse) => void) : void {

            this.logger.log('provider: GetCompanies(' + JSON.stringify(request) + ')')

            this.repository.companies.list(request.skip, request.take, request.order, (error, companies) => {
            
                if(error) {
                    
                    this.logger.log('provider: there was an error.')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                callback({success: true, errors: null, companies: companies})
            })
        }

        //--------------------------------------------------------------
        // Import
        //--------------------------------------------------------------

        public Import(request: providers.ImportRequest, callback: (response: providers.ImportResponse) => void) : void {
            
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

            for(var i = 0; i < data.invoices.length; i++) {
            
                data.invoices[i].created   = new Date(data.invoices[i].created)

                data.invoices[i].startdate = new Date(data.invoices[i].startdate)

                data.invoices[i].enddate   = new Date(data.invoices[i].enddate)
            }

            this.logger.log('provider: importing companies')

            util.async.series((data:any, callback:any) => { this.repository.companies.add(data, callback) }, data.companies, (errors) => {

                var success = 0

                var failed  = 0

                for(var i = 0; i < errors.length; i++) {
                    
                    if(!errors[i]) {
                        
                        success += 1

                        continue
                    }

                    failed += 1
                }

                this.logger.log('provider: company import result success: ' + success.toString() + ' failed: ' + failed.toString())

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



                    this.logger.log('provider: company import result success: ' + success.toString() + ' failed: ' + failed.toString())

                    if(failed > 0) {
                    
                        callback({success: false, errors : errors})  
                        
                        return                                      
                    }
                                        
                    callback({success: true, errors : null})
                })
            })
        }

        //--------------------------------------------------------------
        // Export
        //--------------------------------------------------------------

        public Export(request: providers.ExportRequest, callback: (response: providers.ExportResponse) => void) : void {
            
            this.logger.log('provider: exporting data')

            this.logger.log('provider: counting companies')

            this.repository.companies.count((error, company_count) => {
                
                if(error) {
                
                    this.logger.log('provider: there was an error.')

                    callback({success: false, errors: [error.toString()]})

                    return
                }

                this.logger.log('provider: counted ' + company_count.toString() + ' companies')

                this.logger.log('provider: listing companies')

                this.repository.companies.list(0, company_count, {column: 'name', direction: 'desc'}, (error, companies) => {

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

                                companies : companies,

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