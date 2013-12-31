        
//------------------------------------------------------
// returns the computed amount
//------------------------------------------------------
        
var amount = function(invoice) {

    return invoice.rate * invoice.hours
}
        
//------------------------------------------------------
// returns the computed amount + gst
//------------------------------------------------------
              
var amountgst = function(invoice) {
            
    var figure = amount(invoice) * (invoice.gstrate + 1)
            
    return figure.toFixed(2)
}