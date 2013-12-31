var http = http || {}

http.json = http.json || {}

//--------------------------------------------------------------
// http.json.get
//--------------------------------------------------------------
http.json.get = function (url, headers, success, fail) {

    var beforeSend = function (request) {

        if (headers) {

            for(var n in headers) {

                request.setRequestHeader(n, headers[n])
            }
        }
    }

    $.ajax({
              
        beforeSend  : beforeSend,

        type        : 'GET',

        url         : url,

        dataType    : 'json',

        contentType : "application/json; charset=utf-8",
              
        success     : function (response) {

            if (success) {

                success(response)
            }
        },
        
        error       : function (error) {

            if (fail) {

                fail(error)
            }
        }
        
    })
}

//--------------------------------------------------------------
// http.json.post
//--------------------------------------------------------------
http.json.post = function (url, headers, data, success, fail) {

    var beforeSend = function (request) {

        if (headers) {

            for(var n in headers) {

                request.setRequestHeader(n, headers[n])
            }
        }
    }

    $.ajax({
              
        beforeSend  : beforeSend,

        type        : 'POST',

        url         : url,

        data        : JSON.stringify(data),

        dataType    : 'json',

        contentType : "application/json; charset=utf-8",
              
        success : function (response) {

            if (success) {

                success(response)
            }
        },
        
        error : function (error) {

            if (fail) {

                fail(error)
            }
        }
    })
}

//--------------------------------------------------------------
// http.json.del
//--------------------------------------------------------------
http.json.del = function (url, headers, data, success, fail) {

    var beforeSend = function (request) {

        if (headers) {

            for(var n in headers) {

                request.setRequestHeader(n, headers[n])
            }
        }
    }

    $.ajax({
              
        beforeSend  : beforeSend,

        type        : 'DELETE',

        url         : url,

        data        : JSON.stringify(data),

        dataType    : 'json',

        contentType : "application/json; charset=utf-8",
              
        success : function (response) {

            if (success) {

                success(response)
            }
        },
        
        error : function (error) {

            if (fail) {

                fail(error)
            }
        }
    })
}

//--------------------------------------------------------------
// http.json.put
//--------------------------------------------------------------
http.json.put = function (url, headers, data, success, fail) {

    var beforeSend = function (request) {

        if (headers) {

            for(var n in headers) {

                request.setRequestHeader(n, headers[n])
            }
        }
    }

    $.ajax({
              
        beforeSend  : beforeSend,

        type        : 'PUT',

        url         : url,

        data        : JSON.stringify(data),

        dataType    : 'json',

        contentType : "application/json; charset=utf-8",
              
        success : function (response) {

            if (success) {

                success(response)
            }
        },
        
        error : function (error) {

            if (fail) {

                fail(error)
            }
        }
    })
}