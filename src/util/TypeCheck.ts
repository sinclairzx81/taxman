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

module util.typecheck {

    /** test to see if this object is a boolean */
    export function isBoolean(instance:any) : boolean {

        return (typeof instance) === 'boolean'
    }


    /** test to see if this object is a integer */
    export function isInteger(instance:any) : boolean {

        return (typeof instance === "number") && Math.floor(instance) === instance
    }

    /** test to see if this object is a number */
    export function isNumber(instance:any) : boolean {

        return (typeof instance === "number")
    }

    /** test to see if this object is an array */
    export function isArray(instance:any) : boolean {

        return Object.prototype.toString.call( instance ) === '[object Array]'
    }

    /** tests to see if this object is a string */
    export function isString(instance:any) : boolean {

        return (typeof instance) === 'string'
    }

    /** tests to see if this object is a object */
    export function isObject(instance:any) : boolean {
            
        return (typeof instance) === 'object' && !util.typecheck.isArray(instance)
    }

    /** tests to see if this object is a function */
    export function isFunction(instance:any) : boolean {
        
        return (typeof instance) === 'function'
    }

    /** tests to see if the object is a date */
    export function isDate(instance:any) : boolean {

        return instance.getMonth !== undefined
    }
}