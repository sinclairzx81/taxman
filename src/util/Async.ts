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

module util.async {

    /** runs the supplied function in parallel with the supplied inputs */
    export function parallel (func: Function, inputs: any[], callback: (results:any[])=> void) : void {

        var complete = 0;

        var results  = []

        for(var i = 0; i < inputs.length; i++) {
            
            func(inputs[i], (... args: any[]) => {
                
                results.push(args)

                complete += 1

                if(complete == inputs.length) {
                
                    callback(results[0])
                }
            })
        }        
    }

    /** runs the supplied function in series with the supplied inputs */
    export function series (func: Function, inputs: any[], callback: (results: any[]) => void) : void {
        
        if(inputs) {

            var copy     = inputs.slice(0)

            var results  = []

            var process  = () => {
            
               var input = copy.shift()
           
               func(input, (... args:any[]) => {

                   results.push(args[0])

                   if(copy.length == 0) {
                    
                       callback(results)

                       return
                   }

                   process()
               })
            }

            process()

            return
        }

        callback([])
    }
}