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
/// <reference path="IReporter.ts" />

module reports {

    export class PhantomPDFReporter implements reports.IReporter  {
        
        public mime: string

        constructor(public endpoint: string) {
            
            this.mime = 'application/pdf'

        }

        public report(template_filename: string, context: any, callback: (errors: string[], stream: stream.ReadableStream) => void) : void {
            
            var content = magnum.render(template_filename, context)

            var client   = new phantom.Client(this.endpoint)

            var param  = {  content   : content,

                            mime      : this.mime, 

                            timeout   : 0,

                            paperSize : {

                                    format     : 'A4',

                                    orientation: 'portrait'
                                }
                            }

            client.render(param, (errors, readstream) => {
                    
                if(errors) {
                        
                    callback(errors, null)
                    
                    return errors     
                    
                }

                callback(null, readstream)
            })
        }
    }
}