var MyAjax = {
    "ajax": function(url,object,callback,method,caller) {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                callback.call(caller,xmlhttp.responseText);
            }
        }
        xmlhttp.open(method,url,true);
        xmlhttp.send();
    },
    "get": function(url,object,callback,caller) {
        this.ajax(url,object,callback,"GET",caller);
    },
    "post": function(url,object,callback,caller) {
        this.ajax(url,object,callback,"POST",caller);
    }
};