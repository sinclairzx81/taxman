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

/// <reference path="../repository/ICompany.ts" />
/// <reference path="../repository/IInvoice.ts" />
/// <reference path="../util/Validation.ts" />

module providers {

    export class Validator {
    
        constructor() {
            
            
        }

        public ValidateInvoice(input: repository.IInvoice, callback: (errors: string[], output: repository.IInvoice) => void ) : void {
        
            if(!input) {
            
                callback(['invoice is null'], null)

                return
            }

            var errors = []
            //export interface IInvoice {
            //    invoiceid   : string
            //    company     : string
            //    created     : Date
            //    startdate   : Date
            //    enddate     : Date
            //    hours       : number
            //    rate        : number
            //    gstrate     : number
            //    paid        : boolean
            //    sent        : boolean
            //    comment     : string
            //}
            try { input.invoiceid   = validation.enforce.asString(input.invoiceid) } catch(e) {errors.push('invoiceid: ' + e.toString()) }
            try { input.company     = validation.enforce.asString(input.company) }   catch(e) {errors.push('company: ' + e.toString()) }
            try { input.created     = validation.enforce.asDate(input.created) }     catch(e) {errors.push('created: ' + e.toString()) }
            try { input.startdate   = validation.enforce.asDate(input.startdate) }   catch(e) {errors.push('startdate: ' + e.toString()) }
            try { input.enddate     = validation.enforce.asDate(input.enddate) }     catch(e) {errors.push('enddate: ' + e.toString()) }
            try { input.hours       = validation.enforce.asNumeric(input.hours) }    catch(e) {errors.push('hours: ' + e.toString()) }
            try { input.rate        = validation.enforce.asNumeric(input.rate) }     catch(e) {errors.push('rate: ' + e.toString()) }
            try { input.gstrate     = validation.enforce.asNumeric(input.gstrate) }  catch(e) {errors.push('gstrate: ' + e.toString()) }
            try { input.paid        = validation.enforce.asBoolean(input.paid) }     catch(e) {errors.push('paid: ' + e.toString()) }
            try { input.sent        = validation.enforce.asBoolean(input.sent) }     catch(e) {errors.push('sent: ' + e.toString()) }
            try { input.comment     = validation.enforce.asString(input.comment) }   catch(e) {errors.push('comment: ' + e.toString()) }

            callback(errors, input)
        }

        public ValidateCompany(input: repository.ICompany, callback: (errors: string [], output: repository.ICompany) => void ) : void {
            
            if(!input) {
            
                callback(['company is null'], null)

                return
            }

            var errors = []
            
            callback(errors, input)
        
        }
     }
}