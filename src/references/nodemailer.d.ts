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

﻿declare module nodemailer {

    /* the IXOAuth2 credential */
    export interface IXOAuth2 {

        user         : string

        clientid     : string
        
        clientSecret : string

        refreshToken : string

        accessToken  : string

        timeout      : number
    }

    export interface ICredential {

        /* the username */
        user? : string
        
        /* the password */
        pass? : string
        
        /* the XOAuth2 credential */
        XOAuth2?: IXOAuth2
        
        /* the XOAuthToken */
        XOAuthToken?: any

    }

    export interface ITransportOptions {
        
        /*an optional well known service identifier ("Gmail", "Hotmail" etc., see Well known Services for a list of supported services) to auto-configure host, port and secure connection settings*/
        service?         : string
        
        /*hostname of the SMTP server (defaults to "localhost", not needed with service) */
        host             : string
        
        /*port of the SMTP server (defaults to 25, not needed with service)*/
        port             : number
        
        /*use SSL (default is false, not needed with service). If you're using port 587 then keep secureConnection false, since the connection is started in insecure plain text mode and only later upgraded with STARTTLS */
        secureConnection? : boolean
        
        /*the name of the client server (defaults to machine name) */
        name?             : string
        
        /*ignore server support for STARTTLS (defaults to false) */
        ignoreTLS?        : boolean
        
        /* output client and server messages to console */
        debug?            : boolean
        
        /* how many connections to keep in the pool (defaults to 5) */
        maxConnections?  : number
        
        /* limit the count of messages to send through a single connection (no limit by default) */
        maxMessages?     : number

        /*  authentication object as {user:"...", pass:"..."} or {XOAuth2: {xoauth2_options}} or {XOAuthToken: "base64data"} */
        auth?            : ICredential
    }

    /* the send mail options */
    export interface IMailOptions {

        /* the email address of the sender */
        from    :  string
        
        /* the to email addresses (can be delimited by a comma for multiple recipients) */
        to      : string
        
        /* the subject */
        subject : string
        
        /* the text version of the email (text/plain) */
        text?   : string
        
        /* the html version of the email (text/html) */
        html?   : string
    }

    /* the send mail transport */
    export interface ITransport {
        
        /* sends a email */
        sendMail (options: nodemailer.IMailOptions, callback: (error: any, result: any) => void) : void
        
        /* closes the transport */
        close()
    }

    /* creates the smtp transport. protocol should be set to "SMTP" in standard use cases. */
    export function createTransport(protocol: string, options: nodemailer.ITransportOptions) : nodemailer.ITransport
}