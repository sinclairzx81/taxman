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

/// <reference path="../repository/ICompany.ts" />
/// <reference path="../repository/IInvoice.ts" />

module providers {


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
    // DeleteInvoice
    //------------------------------------

    export interface DeleteInvoiceRequest {
    
        invoice : repository.IInvoice
    }

    export interface DeleteInvoiceResponse extends IResponse  {
    
        
    }


    //------------------------------------
    // GetCompanies
    //------------------------------------

    export interface GetCompaniesRequest extends IRequest {

        skip : number

        take : number

        order ? : {
        
            column    : string

            direction : string
        }
    }

    export interface GetCompaniesResponse extends IResponse {

        companies? : repository.ICompany []
    }

    //------------------------------------
    // GetInvoice
    //------------------------------------
    export interface GetCompanyRequest extends IRequest {
    
        name       : string
    }

    export interface GetCompanyResponse extends IResponse  {

        company? : repository.ICompany
    }

    //------------------------------------
    // UpdateInvoice
    //------------------------------------

    export interface UpdateCompanyRequest extends IRequest {
    
        company : repository.ICompany
    }

    export interface UpdateCompanyResponse extends IResponse  {
    
        
    }

    //------------------------------------
    // DeleteInvoice
    //------------------------------------

    export interface DeleteCompanyRequest {
    
        company : repository.ICompany
    }

    export interface DeleteCompanyResponse extends IResponse  {
    
        
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

