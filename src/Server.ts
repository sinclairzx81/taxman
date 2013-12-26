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
/// <reference path="repository/IRepository.ts" />

class Server {

    constructor(public app: ExpressApplication, public repository: repository.IRepository) {
        
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

            response.render('./views/index.html')

        })

        //---------------------------------------------
        // dashboard
        //---------------------------------------------

        this.app.get('/dashboard', authorize, (request, response) => {
               
            var context = {
            
                request: request
            }

            response.render('./views/dashboard.html', context)
        })

        //---------------------------------------------
        // invoices
        //---------------------------------------------
        this.app.get('/invoices', authorize, (request, response) => {

            var context = {
            
                request: request
            }
                            
            response.render('./views/invoices.html', context)
        })
        //---------------------------------------------
        // companies
        //---------------------------------------------
        this.app.get('/companies', authorize, (request, response) => {
            
            var context = {
            
                request: request
            }
                        
            response.render('./views/companies.html', context)
        })

        this.app.get('/tools', authorize, (request, response) => {
            
            var context = {
            
                request: request
            }
                            
            response.render('./views/tools.html', context)
        })
    }
}

