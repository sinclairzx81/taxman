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

module security.password {

    var crypto = require('crypto')

    var algorithm = 'sha1'

    var iterations = 16

    function generateSalt(length:number) : string {
        
        return crypto.randomBytes(length).toString('hex').substring(0, length)
    }

    function generateHash(salt, password) : string {
    
        var hash = password

        for(var i = 0; i < iterations; i++) {
            
            hash = crypto.createHmac(algorithm, salt).update(hash).digest('hex')
        }

        return hash
    }

    export function generate(password:string, callback:(hash:string, salt:string) => void) : void {

        var salt = generateSalt(32)

        var hash = generateHash(salt, password)

        callback(hash, salt)
    }

    export function validate(password:string, hash:string, salt:string, callback:(success:boolean)=>void) : void {
    
        var compare = generateHash(salt, password)

        callback(hash == compare)
    }
}