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

/// <reference path="../repository/IClient.ts" />
/// <reference path="../repository/IInvoice.ts" />

module provider {


    //------------------------------------
    // Request
    //------------------------------------

    export interface IRequest {

    }

    export interface IResponse {

        success : boolean

        errors? : string[]
    }

    //------------------------------------
    // GetInvoices
    //------------------------------------

    export interface GetInvoicesRequest extends IRequest {

        skip : number

        take : number

        order ? : {
        
            column    : string

            direction : string
        }
    }

    export interface GetInvoicesResponse extends IResponse {

        invoices? : repository.IInvoice []
    }

    //------------------------------------
    // CountInvoices
    //------------------------------------

    export interface CountInvoicesRequest extends IRequest {
    

    }

    export interface CountInvoicesResponse extends IResponse {
    
        count? : number
    }

    //------------------------------------
    // GetInvoice
    //------------------------------------
    export interface GetInvoiceRequest extends IRequest {
    
        invoiceid : string
    }

    export interface GetInvoiceResponse extends IResponse  {

        invoice? : repository.IInvoice
    }

    //------------------------------------
    // UpdateInvoice
    //------------------------------------

    export interface UpdateInvoiceRequest extends IRequest {
    
        invoice : repository.IInvoice
    }

    export interface UpdateInvoiceResponse extends IResponse  {
    
        
    }

    //------------------------------------
    // CreateInvoice
    //------------------------------------

    export interface CreateInvoiceRequest extends IRequest {
    
        invoice : repository.IInvoice
    }

    export interface CreateInvoiceResponse extends IResponse  {
    
        
    }
    //------------------------------------
    // DeleteInvoice
    //------------------------------------

    export interface DeleteInvoiceRequest {
    
        invoiceid : string
    }

    export interface DeleteInvoiceResponse extends IResponse  {
    
        
    }

    //------------------------------------
    // LastInvoice
    //------------------------------------

    export interface LastInvoiceRequest {
    
         
    }

    export interface LastInvoiceResponse extends IResponse  {
    
        invoice : repository.IInvoice
    }

    //------------------------------------
    // GetClients
    //------------------------------------

    export interface GetClientsRequest extends IRequest {

        skip : number

        take : number

        order ? : {
        
            column    : string

            direction : string
        }
    }

    export interface GetClientsResponse extends IResponse {

        clients? : repository.IClient []
    }

    //------------------------------------
    // GetInvoice
    //------------------------------------
    export interface GetClientRequest extends IRequest {
    
        clientid       : string
    }

    export interface GetClientResponse extends IResponse  {

        client? : repository.IClient
    }

    //------------------------------------
    // CreateInvoice
    //------------------------------------

    export interface CreateClientRequest extends IRequest {
    
        client : repository.IClient
    }

    export interface CreateClientResponse extends IResponse  {
    
        
    }

    //------------------------------------
    // UpdateInvoice
    //------------------------------------

    export interface UpdateClientRequest extends IRequest {
    
        client : repository.IClient
    }

    export interface UpdateClientResponse extends IResponse  {
    
        
    }

    //------------------------------------
    // DeleteInvoice
    //------------------------------------

    export interface DeleteClientRequest {
    
        clientid  : string
    }

    export interface DeleteClientResponse extends IResponse  {
    
        
    }

    //------------------------------------
    // Import
    //------------------------------------

    export interface ImportRequest extends IRequest {
    
        json: string
    }

    export interface ImportResponse extends IResponse  {
    
        
    }

    //------------------------------------
    // Export
    //------------------------------------
    
    export interface ExportRequest extends IRequest {
        

    }

    export interface ExportResponse extends IResponse  {
        
        json?: string
    }
}

