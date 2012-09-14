dojo.provide("js.Util");

js.Util = (function() {
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
        connect: function(source, sourceFn, target, targetFn) {
            var existing = source[sourceFn];
            source[sourceFn] = function() {
                existing.apply(this,arguments);
                target[targetFn].apply(target,arguments);
            }
        },
        bind: function(fn, con) {
            return function() {
                fn.apply(con, arguments);
            }
        },
        ajaxGet: function(url, object, callback, caller) {
            ajax(url, object, callback, "GET", caller);
        },
        ajaxPost: function(url, object, callback, caller) {
            ajax(url, object, callback, "POST", caller);
        },
        pubsub: (function() {
            var listeners = {};
            return {
                subscribe: function(event, fn, cont) {
                    if(!listeners[event])
                        listeners[event] = [];
                    listeners[event].push({func:fn,context:cont});
                },
                publish: function(event, message) {
                    if(!listeners[event])
                        listeners[event] = [];
                    listeners[event].forEach(function(subscriber) {
                        subscriber.func.apply(subscriber.context,[message]);
                    });
                }
            }
        })(),
        initClickHandler: function(domelement,func,context) {
            this.initEventHandler(domelement,"click",func,context);
        },
        initSubmitHandler: function(domelement,func,context) {
            this.initEventHandler(domelement,"submit",func,context);
        },
        initEventHandler: function(domelement,event,func,context) {
            domelement.addEventListener(event,this.bind(func,context));
        },
        myalert: function(message) {
            alert(message);
        }
    };
})();
