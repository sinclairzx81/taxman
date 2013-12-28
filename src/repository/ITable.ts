module repository {

    /** common base interface for all tables */
    export interface ITable<T> {
        
        schema (callback?: (error: any) => void) : void
        
        count  (callback?: (error: any, count: number) => void) : void
        
        add    (record:T,  callback?:(error:any) => void) : void

        update (record:T,  callback?:(error:any) => void) : void
        
        remove (id:string, callback?:(error:any) => void) : void
        
        get    (id:string, callback?:(error:any, record: T) => void) : void
        
        list   (skip: number, take: number, order?: string, callback?:(error:any, items: T[]) => void) : void
        
        find   (query: string, skip: number, take: number, order?: string, callback?:(error:any, items: T[]) => void) : void 
    }
}
