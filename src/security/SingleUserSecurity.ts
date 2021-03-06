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

/// <reference path="password.ts" />
/// <reference path="secret.ts" />
/// <reference path="ISecurity.ts" />

module security {

    export interface ISingleUserSecurityOptions {
    
        username : string

        password : {
        
            hash: string

            salt: string
        }
        
        key   : string

        secret: string
    }

    export class SingleUserSecurity implements security.ISecurity {
    
        constructor(public options: ISingleUserSecurityOptions) {

        }

        public authenticate (username: string, password: string, callback: (success: boolean, token: string) => void) : void {
            
            if(username == this.options.username) {

                security.password.validate(password, this.options.password.hash, this.options.password.salt, (success) => {
                    
                    var token = {

                        username : username,

                        key      : this.options.key
                    }

                    security.secret.encrypt(JSON.stringify(token), this.options.secret, (result: string) => {
                        
                        callback(success, result)
                    })
                })        
            }

            callback(false, null)
        }

        public authorize(token: string, callback: (success: boolean) => void) : void {
            
            security.secret.decrypt(token, this.options.secret, (result) => {
                
                try {

                    var token = JSON.parse(result)

                    if(token.key == this.options.key) {

                        callback(true)

                        return
                    }

                } catch(e) {
                    
                }

                callback(false)
            })
        }
    }
}