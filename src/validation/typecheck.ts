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

module validation.typecheck {

    /** test to see if this object is a boolean */
    export function isBoolean(value:any) : boolean {

        return (typeof value) === 'boolean'
    }

    /** test to see if this object is a integer */
    export function isInteger(value:any) : boolean {

        return (typeof value === "number") && Math.floor(value) === value
    }

    /** test to see if this object is a number */
    export function isNumeric(value:any) : boolean {

        return (typeof value === "number")
    }

    /** test to see if this object is an array */
    export function isArray(value:any) : boolean {

        return Object.prototype.toString.call( value ) === '[object Array]'
    }

    /** tests to see if this object is a string */
    export function isString(value:any) : boolean {

        return (typeof value) === 'string'
    }

    /** tests to see if this object is a object */
    export function isObject(value:any) : boolean {
            
        return (typeof value) === 'object' && !validation.typecheck.isArray(value)
    }

    /** tests to see if this object is a function */
    export function isFunction(value:any) : boolean {
        
        return (typeof value) === 'function'
    }

    /** tests to see if the object is a date */
    export function isDate(value:any) : boolean {

        if (typeof value != 'object') {

            return false

        }
        if (value.getDate            == null ||
            
            value.getDay             == null ||
            
            value.getFullYear        == null ||
            
            value.getHours           == null ||
            
            value.getMilliseconds    == null ||
            
            value.getMinutes         == null ||
            
            value.getMonth           == null ||
            
            value.getSeconds         == null ||
            
            value.getTime            == null ||
            
            value.getTimezoneOffset  == null ||
            
            value.getUTCDate         == null ||
            
            value.getUTCDay          == null ||
            
            value.getUTCFullYear     == null ||
            
            value.getUTCHours        == null ||
            
            value.getUTCMilliseconds == null ||
            
            value.getUTCMinutes      == null ||
            
            value.getUTCMonth        == null ||
            
            value.setDate            == null ||
            
            value.setFullYear        == null ||
            
            value.setHours           == null ||
            
            value.setMilliseconds    == null ||
            
            value.setMinutes         == null ||
            
            value.setMonth           == null ||
            
            value.setSeconds         == null ||
            
            value.setTime            == null ||
            
            value.setUTCDate         == null ||
            
            value.setUTCFullYear     == null ||
            
            value.setUTCHours        == null ||
            
            value.setUTCMilliseconds == null ||
            
            value.setUTCMinutes      == null ||
            
            value.setUTCMonth        == null ||

            value.setUTCSeconds      == null) {

            return false
        }

        return true
    }
}