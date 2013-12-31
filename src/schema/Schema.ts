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

/// <reference path="../repository/IClient.ts" />
/// <reference path="../repository/IInvoice.ts" />
/// <reference path="../util/Validation.ts" />

module schema {

    /** front side validation of incoming data */
    export class Schema {

        constructor() {        
        }
        
        /** attempts to validate the integrity of a incoming client */
        public validateClient (client: repository.IClient, callback: (errors: string[]) => void) : void {
    
            var errors = []

            if(!validation.typecheck.isString(client.name))    errors.push('schema: client.name is not a string')  

            if(!validation.typecheck.isString(client.clientid))    errors.push('schema: client.clientid is not a string')  

            if(!validation.typecheck.isString(client.email))   errors.push('schema: client.email is not a string')  

            if(!validation.typecheck.isString(client.phone))   errors.push('schema: client.phone is not a string')  

            if(!validation.typecheck.isString(client.website)) errors.push('schema: client.website is not a string')  

            if(!validation.typecheck.isString(client.address)) errors.push('schema: client.address is not a string')  

            if(!validation.typecheck.isString(client.comment)) errors.push('schema: client.comment is not a string')   

            callback(errors)
        }
        
        /** attempts to validate the integrity of a incoming invoice */
        public validateInvoice (invoice: repository.IInvoice, callback: (errors: string[]) => void) : void {
    
            var errors = []  
        
            if(!validation.typecheck.isString(invoice.invoiceid)) errors.push('schema: invoice.invoiceid is not a string')    

            if(!validation.typecheck.isString(invoice.client))    errors.push('schema: invoice.client is not a string')    

            if(!validation.typecheck.isString(invoice.created)) {
            
                errors.push('schema: invoice.created is not string')
            }
            else {

                if(!validation.strings.isDate(invoice.created)) errors.push('schema: invoice.created is not iso8601 string')
            }

            if(!validation.typecheck.isString(invoice.startdate)) {
            
                errors.push('schema: invoice.startdate is not string')
            }
            else {

                if(!validation.strings.isDate(invoice.startdate)) errors.push('schema: invoice.startdate is not iso8601 string')
            }

            if(!validation.typecheck.isString(invoice.enddate)) {
            
                errors.push('schema: invoice.enddate is not string')
            }
            else {

                if(!validation.strings.isDate(invoice.enddate)) errors.push('schema: invoice.enddate is not iso8601 string')
            }   

            if(!validation.typecheck.isNumeric(invoice.hours))    errors.push('schema: invoice.hours is not a number')    

            if(!validation.typecheck.isNumeric(invoice.rate))     errors.push('schema: invoice.rate is not a number')    

            if(!validation.typecheck.isNumeric(invoice.gstrate))  errors.push('schema: invoice.gstrate is not a number')    

            if(!validation.typecheck.isBoolean(invoice.paid))     errors.push('schema: invoice.paid is not a boolean')  

            if(!validation.typecheck.isBoolean(invoice.sent))     errors.push('schema: invoice.sent is not a boolean')  

            if(!validation.typecheck.isString(invoice.comment))   errors.push('schema: invoice.comment is not a string')

            callback(errors)
        }
    }
}

