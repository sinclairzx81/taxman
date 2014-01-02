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

module validation.strings   {

    export interface ConversionResult<T> {
    
        success: boolean

        value  : T
    }
    
    /** converts this string to a integer */
    export function toInteger(value: any) : ConversionResult<number> {
    
        if(!validation.typecheck.isString(value)) {
        
            return {success: false, value: null}
        }

        var num = parseInt(value)

        if(isNaN(num)){
        
            return {success: false, value: null}
        }

        return {success: true, value: num}
    }

    /** converts this string to a numeric value */
    export function toNumeric(value: any)   : ConversionResult<number> {
    
        if(!validation.typecheck.isString(value)) {
        
            return {success: false, value: null}
        }

        var num = parseFloat(value)

        if(isNaN(num)){
        
            return {success: false, value: null}
        }

        return {success: true, value: num}
    }
    
    /** converts this string to a boolean */
    export function toBoolean(value: any) : ConversionResult<boolean> {
        
        if(!validation.typecheck.isString(value)) {
        
            return {success: false, value: null}
        }

        if(value == 'True')  return  { success:true, value : true  }

        if(value == 'true')  return  { success:true, value : true  }

        if(value == 'False') return { success:true,  value : false }

        if(value == 'false') return { success:true,  value : false }

        return {success: false, value: null}
    }

    /** converts this string to a Date. String must be a valid iso8601 string. */
    export function toDate(value: any)    : ConversionResult<Date> {
        
        if(validation.strings.isDate(value)) {
        
            return { success: true, value: new Date(value) }
        }

        return { success: false, value: null }
    }

    /** validates this string as a iso8601 date. */
    export function isDate(value:any) : boolean {
    
        var regex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/i    

        return regex.test(value)
    }

    /** validates this string is a email address */
    export function isEmail(value: any) : boolean {
        
        if(value.length > 2083) {
            
            return false
        }

        var match = value.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)

        return (match != null) 

    }
    
    /** validates this string is a URL address */
    export function isUrl(value: any) : boolean {
        
        if(value.length > 2083) {
            
            return false
        }

        var match = value.match(/^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i)

        return (match != null) 
    }

    /** validates this string is a IPv4 address */
    export function isIPv4(value: any) : boolean {

        if (/^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/.test(value)) {
            
            var parts: any = value.split('.').sort();
            
            if (parts[3] > 255) {

                return false;
            }
            return true;
        }
        return false;
    }
    
    /** validates this string is a IPv6 address */
    export function isIPv6(value: any) : boolean {

        if (/^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/.test(value)) {

            return true;
        }

        return false;
    }

    /** validates this string is string characters */
    export function isAlpha(value: any) : boolean {

        if(/^[a-zA-Z]+$/.test(value)) {
        
            return true
        }

        return false
    }
   
    /** validates this string is alpha numeric */
    export function isAlphanumeric(value: any) : boolean {

        if(/^[a-zA-Z0-9]+$/.test(value)) {
        
            return true
        }

        return false
    }
    
    /** validates this string is numeric */
    export function isNumeric(value: any) : boolean {

        if(/^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/.test(value)) {
        
            return true
        }

        return false
    }
    
    /** validates this string is hex */
    export function isHexadecimal(value: any) : boolean {

        if(/^[0-9a-fA-F]+$/.test(value)) {
        
            return true
        }

        return false
    }

    /** validates this string is a hex color */
    export function isHexColor(value: any) : boolean {

        if(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
        
            return true
        }

        return false
    }

    /** validates this string is lowercase */
    export function isLowercase(value: any) : boolean {

        return value === value.toLowerCase();
    }
    
    /** validates this string is uppercase */
    export function isUppercase(value: any) : boolean {

        return value === value.toUpperCase();
    }

    /** validates this string a integer */
    export function isInteger(value: any) : boolean {

        if(/^(?:-?(?:0|[1-9][0-9]*))$/.test(value)) {
        
            return true
        }

        return false
    }

    /** validates this string is not null */
    export function notNull(value: any) : boolean {
        
        return value != null;
    }
    
    /** validates this string is null */
    export function isNull(value: any) : boolean {

        return value == null;
    }
    
    /** validates this string as not empty */
    export function notEmpty(value: any) : boolean {

        if(value == null) {
        
            return false
        }

        return value.length > 0
    }

    /** validates this string as a guid */
    export function isUUID4(value: any) : boolean {

       return /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value)
    }

    /** validates this string as a credit card */
    export function isCreditCard(value: any) : boolean {
        
        var sanitized = value.replace(/[^0-9]+/g, '');
        
        if (sanitized.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/) === null) {
            
            return null
        }
        
        var sum = 0;
        
        var digit;
        
        var tmpNum;
        
        var shouldDouble = false;
        
        for (var i = sanitized.length - 1; i >= 0; i--) {

            digit = sanitized.substring(i, (i + 1))

            tmpNum = parseInt(digit, 10)
            
            if (shouldDouble) {
                
                tmpNum *= 2

                if (tmpNum >= 10) {

                    sum += ((tmpNum % 10) + 1)
                }
                else {
                    sum += tmpNum
                }
            }
            else {

                sum += tmpNum
            }
            if (shouldDouble) {

                shouldDouble = false
            }
            else {
                shouldDouble = true
            }
        }

        if ((sum % 10) === 0) {

            return true

        } else {

            return false;
        }
    }
}