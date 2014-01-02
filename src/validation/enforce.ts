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

/// <reference path="typecheck.ts" />
/// <reference path="strings.ts" />

module validation.enforce   {

    /** brute forces this value to a string */
    export function asString(value: any) : string {
        
        if(value == null) {
        
            throw Error('value is null')
        }

        return value.toString()
    }
    
    /** brute forces this value to a integer */
    export function asInteger(value: any) : number {
    
        if(validation.typecheck.isInteger(value)) {
        
            return value
        }

        if(validation.typecheck.isNumeric(value)) {
        
            return parseInt(value)
        }

        if(validation.typecheck.isString(value)) {
        
            if(validation.strings.isNumeric(value)) {
            
                return parseInt(value)
            }
        }

        throw Error('not a integer')
    }
    
    /** brute forces this value to a numeric */
    export function asNumeric (value: any) : number {
    
        if(validation.typecheck.isInteger(value)) {
        
            return value
        }

        if(validation.typecheck.isNumeric(value)) {
        
            return value
        }

        if(validation.typecheck.isString(value)) {
        
            if(validation.strings.isNumeric(value)) {
            
                return parseFloat(value)
            }
        }

        throw Error('not a integer')
    }
    
    /** brute forces this value to a date */
    export function asDate(value: any) : Date {
    
        if(validation.typecheck.isDate(value)) {
        
            return value
        }

        if(validation.typecheck.isString(value)) {
        
           var convert = validation.strings.toDate(value)

           if(convert.success) {
           
                return convert.value
           }
        }

        throw Error('not a date')
    }
    
    /** brute forces this value to a boolean */
    export function asBoolean(value: any) : boolean {
    
        if(validation.typecheck.isBoolean(value)) {
        
            return value
        }

        var convert = validation.strings.toBoolean(value)

        if(convert.success) {
        
            return convert.value
        }

        throw Error('not a boolean.')
    }
}