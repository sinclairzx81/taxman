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

class Server {

    constructor(public app: ExpressApplication, public provider: providers.Provider, public logger: loggers.ILogger ) {
        
        this.setup()

        this.handlers()
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

    private handlers() : void {
            
        var authorize = (request, response, next) => {
            
            next()
        }

        //---------------------------------------------
        // index
        //---------------------------------------------
        
        this.app.get('/', (request, response) => {
            
            var context = { request: request }
            
            response.render('./views/index.html', context)
        })

        //---------------------------------------------
        // dashboard
        //---------------------------------------------

        this.app.get('/dashboard', authorize, (request, response) => {
               
            var context = { request: request }
            
            response.render('./views/dashboard/index.html', context)
        })

        //---------------------------------------------
        // invoices
        //---------------------------------------------
        this.app.get('/invoices', authorize, (request, response) => {

            this.provider.get_invoices((invoices) => {
            
                var context = { request: request, invoices: invoices }

                response.render('./views/invoices/index.html', context)                   
            })
        })

        this.app.get('/invoices/create', authorize, (request, response) => {
            
            this.provider.get_companies((companies) => {

                var context = { request: request, companies: companies }

                response.render('./views/invoices/create.html', context)
            })
        })

        this.app.get('/invoices/:id', authorize, (request, response) => {

            this.provider.get_companies((companies) => {
                
                this.provider.get_invoice(request.params.id, (invoice) => {
            
                    var context = { request: request, invoice: invoice, companies: companies }

                    response.render('./views/invoices/update.html', context)            
                })                
            })
        })

        this.app.post('/invoices/:id', authorize, express.urlencoded(), (request, response) => {

            console.log(request.body)

            var context = { request: request }

            response.redirect('/invoices')
        })

        //---------------------------------------------
        // companies
        //---------------------------------------------

        this.app.get('/companies', authorize, (request, response) => {
            
            this.provider.get_companies((companies) => {
            
                var context = { request: request, companies: companies }

                response.render('./views/companies/index.html', context)            
            })
        })

        this.app.get('/companies/create', authorize, (request, response) => {
            
            var context = { request: request }
                        
            response.render('./views/companies/create.html', context)
        })

        this.app.get('/companies/:id', authorize, (request, response) => {
            
            var context = { request: request }

            response.render('./views/companies/update.html', context)
        })

        this.app.post('/companies/:id', authorize, (request, response) => {
            
            var context = { request: request }

            response.render('./views/companies/update.html', context)
        })
        
        //---------------------------------------------
        // settings
        //---------------------------------------------
        
        this.app.get('/settings', authorize, (request, response) => {
            
            var context = {  request: request }
               
            response.render('./views/settings/index.html', context)
        })

        //---------------------------------------------
        // tools
        //---------------------------------------------
        
        this.app.get('/tools', authorize, (request, response) => {
            
            var context = { request: request }
               
            response.render('./views/tools/index.html', context)
        })
    }
}

