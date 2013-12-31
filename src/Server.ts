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

/// <reference path="references.ts" />
/// <reference path="providers/Provider.ts" />
/// <reference path="loggers/ILogger.ts" />
/// <reference path="Schema.ts" />

class Server {

    private schema: Schema;

    constructor(public app: ExpressApplication, public provider: providers.Provider, public logger: loggers.ILogger ) {
        
        this.schema = new Schema()

        this.setup()

        this.setup_pages()

        this.setup_api()
    }

    private setup()       : void {
        
        this.app.use('/static', express.static('./static/'))

        this.app.use((request, response, next) => {

            response.render = (path, context) => {

                var output = magnum.render(path, context)

                response.setHeader('Content-Type', 'text/html')

                response.setHeader('Content-Length', Buffer.byteLength(output))

                response.send(output)
            }
            
            next()
        })        
    }

    private setup_pages() : void {
            
        var authorize = (request, response, next) => {
            
            next()
        }
        
        this.app.get('/', (request, response) => {
            
            var context = { request: request }
            
            response.render('./views/dashboard/index.html', context)
        })

        this.app.get('/dashboard', authorize, (request, response) => {
               
            var context = { request: request }
            
            response.render('./views/dashboard/index.html', context)
        })

        this.app.get('/invoices', authorize, (request, response) => {

            var context = {request: request}

            response.render('./views/invoices/index.html', context)                   
        })

        this.app.get('/invoices/create', authorize, (request, response) => {
            
            var context = {request: request}

            response.render('./views/invoices/create.html', context)
        })

        this.app.get('/invoices/:invoiceid', authorize, (request, response) => {

            var context = {request: request, invoiceid : request.params.invoiceid}

            response.render('./views/invoices/update.html', context)
        })

        this.app.get('/companies', authorize, (request, response) => {
            
            var context = {request: request}

            response.render('./views/companies/index.html', context)
        })

        this.app.get('/companies/create', authorize, (request, response) => {
            
            var context = { request: request }
                        
            response.render('./views/companies/create.html', context)
        })

        this.app.get('/companies/:companyid', authorize, (request, response) => {
            
            var context = { request: request, companyname: request.params.companyid }

            response.render('./views/companies/update.html', context)
        })
        
        this.app.get('/settings', authorize, (request, response) => {
            
            var context = {  request: request }
               
            response.render('./views/settings/index.html', context)
        })

        this.app.get('/tools', authorize, (request, response) => {
            
            var context = {  request: request }
               
            response.render('./views/tools/index.html', context)
        })
    }

    private setup_api ()  : void {
    
        var authorize = (request, response, next) => {
            
            next()
        }

        this.app.post('/api/companies', authorize, express.json(), (request, response) => {
        
            var input: providers.GetCompaniesRequest = {

                skip  : request.body.skip,

                take  : request.body.take,

                order : request.body.order
            }

            this.provider.GetCompanies(input, (output) => {

                response.json(output)    
            })
        })

        this.app.get('/api/companies/:companyname', authorize, (request, response) => {
        
            
        })

        this.app.post('/api/companies:companyname', authorize, (request, response) => {
        
            
        })

        this.app.put('/api/companies/:companyname', authorize, (request, response) => {
        
            
        })

        this.app.del('/api/companies/:companyname', authorize, (request, response) => {
        
            
        })

        this.app.post('/api/invoices', authorize, express.json(), (request, response) => {
            
            var input: providers.GetInvoicesRequest = {

                skip  : request.body.skip,

                take  : request.body.take,

                order : request.body.order
            }

            this.provider.GetInvoices(input, (output) => {

                response.json(output)    
            })
        })

        this.app.get('/api/invoices/count', authorize, (request, response) => {
        
            var input: providers.CountInvoicesRequest = {
                
            }

            this.provider.CountInvoices(input, (output) => {
            
                response.json(output)
            })
        })

        this.app.get('/api/invoices/:invoiceid', authorize, (request, response) => {
        
            var input: providers.GetInvoiceRequest = {
            
                invoiceid : request.params.invoiceid
            }

            this.provider.GetInvoice(input, (output) => {
                
                response.json(output)
            })
        })

        this.app.post('/api/invoices:invoiceid', authorize, (request, response) => {
        
            
        })

        this.app.put('/api/invoices/:invoiceid', authorize, express.json(), (request, response) => {
            
            this.schema.validateInvoice(request.body, (errors) => {
                
                if(errors.length > 0) {
                    
                    response.json({success: false, errors: errors})

                    return
                }

                var input: providers.UpdateInvoiceRequest = {
                
                    invoice : {
                    
                        invoiceid   : request.body.invoiceid,

                        company     : request.body.company,

                        created     : new Date(request.body.created),

                        startdate   : new Date(request.body.startdate),

                        enddate     : new Date(request.body.enddate),

                        hours       : request.body.hours,

                        rate        : request.body.rate,

                        gstrate     : request.body.gstrate,

                        paid        : request.body.paid,

                        sent        : request.body.sent,

                        comment     : request.body.comment                 
                    }
                }

                this.provider.UpdateInvoice(input, (output) => {
            
                    response.json(output)
                })                
            })
        })

        this.app.del('/api/invoices/:invoiceid', authorize, (request, response) => {
        
            var input: providers.DeleteInvoiceRequest = {
            
                invoiceid : request.params.invoiceid
            }

            this.provider.DeleteInvoice(input, (output) => {
            
                response.json(output)
            })            
        })                                  
    }

}

