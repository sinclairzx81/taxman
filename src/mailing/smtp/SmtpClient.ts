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

/// <reference path="../../references.ts" />
/// <reference path="../../loggers/ILogger.ts" />
/// <reference path="../IMailClient.ts" />
/// <reference path="../IMessage.ts" />
/// <reference path="SmtpOptions.ts" />

module mailing {

    export class SmtpClient implements mailing.IMailClient {

        private client: nodemailer.ITransport

        constructor(public options: mailing.SmtpOptions, public logger: loggers.ILogger ) {

            var _nodemailer: typeof nodemailer = require('nodemailer')

            this.client = _nodemailer.createTransport("SMTP", options)
        }

        public send(options: mailing.IMessage, callback: (error: any) => void) : void {

            this.client.sendMail(options, (error, result) => {

                callback(error)
            })
        }

        public close() : void {

            this.client.close()
        }
    }
}    

