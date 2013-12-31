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
/// <reference path="loggers/ILogger.ts" />
/// <reference path="provider/Provider.ts" />
/// <reference path="schema/Schema.ts" />

class Server {

    private schema: schema.Schema;

    constructor(public app: ExpressApplication, public provider: provider.Provider, public logger: loggers.ILogger ) {
        
        this.schema = new schema.Schema()

        this.setup()

        this.setup_pages()

        this.setup_api()
    }

    private setup() : void {
        
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

        this.app.get('/clients', authorize, (request, response) => {
            
            var context = {request: request}

            response.render('./views/clients/index.html', context)
        })

        this.app.get('/clients/create', authorize, (request, response) => {
            
            var context = { request: request }
                        
            response.render('./views/clients/create.html', context)
        })

        this.app.get('/clients/:clientid', authorize, (request, response) => {
            
            var context = { request: request, clientid: request.params.clientid }

            response.render('./views/clients/update.html', context)
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

        //------------------------------------------------
        // INVOICES
        //------------------------------------------------

        this.app.post('/api/clients', authorize, express.json(), (request, response) => {
        
            var input: provider.GetClientsRequest = {

                skip  : request.body.skip,

                take  : request.body.take,

                order : request.body.order
            }
            
            this.provider.getClients(input, (output) => {

                response.json(output)    
            })
        })

        this.app.get('/api/clients/:clientid', authorize, (request, response) => {
        
            var input: provider.GetClientRequest = {
            
                clientid : request.params.clientid
            }

            this.provider.getClient(input, (output) => {

                response.json(output)
            })
        })

        this.app.put('/api/clients/:clientid', authorize, express.json(), (request, response) => {
            
            this.schema.validateClient(request.body, (errors) => {
                
                if(errors.length > 0) {
                    
                    response.json({success: false, errors: errors})

                    return
                }                

                var input: provider.UpdateClientRequest = {
            
                    client : {

                        name        : request.body.name,

                        clientid        : request.body.clientid,

                        email       : request.body.email,

                        phone       : request.body.phone,

                        website     : request.body.website,

                        address     : request.body.address,

                        comment     : request.body.comment,                    
                    }
                }
                
                this.provider.updateClient(input, (output) => {
                
                    response.json(output)
                })      
            })
        })

        this.app.post('/api/clients/create', authorize, express.json(), (request, response) => {
            
            console.log(request.body)

            this.schema.validateClient(request.body, (errors) => {
                
                if(errors.length > 0) {
                    
                    response.json({success: false, errors: errors})

                    return
                } 

                var input: provider.UpdateClientRequest = {
            
                    client : {

                        name        : request.body.name,

                        clientid        : request.body.clientid,

                        email       : request.body.email,

                        phone       : request.body.phone,

                        website     : request.body.website,

                        address     : request.body.address,

                        comment     : request.body.comment,                    
                    }
                }
                
                this.provider.createClient(input, (output) => {
                
                    response.json(output)
                })      
            })
            
        })

        this.app.del('/api/clients/:clientid', authorize, (request, response) => {

            var input: provider.DeleteClientRequest = {
            
                clientid : request.params.clientid
            }

            this.provider.deleteClient(input, (output) => {
            
                response.json(output)
            })
        })

        //------------------------------------------------
        // INVOICES
        //------------------------------------------------

        this.app.post('/api/invoices', authorize, express.json(), (request, response) => {
            
            var input: provider.GetInvoicesRequest = {

                skip  : request.body.skip,

                take  : request.body.take,

                order : request.body.order
            }

            this.provider.getInvoices(input, (output) => {

                response.json(output)    
            })
        })

        this.app.get('/api/invoices/count', authorize, (request, response) => {
        
            var input: provider.CountInvoicesRequest = {
                
            }

            this.provider.countInvoices(input, (output) => {
            
                response.json(output)
            })
        })

        this.app.get('/api/invoices/:invoiceid', authorize, (request, response) => {
        
            var input: provider.GetInvoiceRequest = {
            
                invoiceid : request.params.invoiceid
            }
            
            this.provider.getInvoice(input, (output) => {
                
                response.json(output)
            })
        })

        this.app.post('/api/invoices/create', authorize, express.json(), (request, response) => {
            
            this.schema.validateInvoice(request.body, (errors) => {

                if(errors.length > 0) {
                    
                    response.json({success: false, errors: errors})

                    return
                }
                
                var input: provider.CreateInvoiceRequest = {
                
                    invoice : {
                    
                        invoiceid   : request.body.invoiceid,

                        client      : request.body.client,

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

                this.provider.createInvoice(input, (output) => {
            
                    response.json(output)
                }) 
            })
            
        })

        this.app.put('/api/invoices/:invoiceid', authorize, express.json(), (request, response) => {
            
            this.schema.validateInvoice(request.body, (errors) => {
                
                if(errors.length > 0) {
                    
                    response.json({success: false, errors: errors})

                    return
                }

                var input: provider.UpdateInvoiceRequest = {
                
                    invoice : {
                    
                        invoiceid   : request.body.invoiceid,

                        client      : request.body.client,

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

                this.provider.updateInvoice(input, (output) => {
            
                    response.json(output)
                })                
            })
        })

        this.app.del('/api/invoices/:invoiceid', authorize, (request, response) => {
        
            var input: provider.DeleteInvoiceRequest = {
            
                invoiceid : request.params.invoiceid
            }

            this.provider.deleteInvoice(input, (output) => {
            
                response.json(output)
            })            
        })                                  
    }

}

