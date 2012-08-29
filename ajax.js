var MyAjax = (function() {
    var ajax = function(url, object, callback, method, caller) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    callback.call(caller, xmlhttp.responseText);
                } else {
                    alert("Error contacting server, check connection or try again later");
                }
            }
        }
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    };
    return {
        get: function(url, object, callback, caller) {
            ajax(url, object, callback, "GET", caller);
        },
        post: function(url, object, callback, caller) {
            ajax(url, object, callback, "POST", caller);
        }
    };
})();
