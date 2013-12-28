module util.async {

    export function parallel (func: Function, inputs: any[], callback: (results:any[])=> void) : void {

        var complete = 0;

        var results  = []

        for(var i = 0; i < inputs.length; i++) {
            
            func(inputs[i], (... args:any[]) => {
                
                results.push(args)

                complete += 1

                if(complete == inputs.length) {
                
                    callback(results)
                }
            })
        }        
    }

    export function series   (method: Function, inputs: any[], callback: ()=> void) : void {
    
    
    }
}