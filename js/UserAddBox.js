dojo.provide("js.UserAddBox");

dojo.require("dijit.dijit");

dojo.declare("js.UserAddBox", [dijit._Widget, dijit._Templated], {
    widgetsInTemplate: true,
    templateString: dojo.cache("templates", "UserAddBox.html"),

    submitHandler: function(e) {
        e.preventDefault();
        util.pubsub.publish("addingNewUser",this.inputElement.value);
        this.inputElement.value = "";
    },

    init: function() {
        util.initSubmitHandler(this.node,this.submitHandler,this);
    },

    constructor: function() {
    },

    postCreate: function() {
        this.init();
    }

});
/*
function(dojo, twiclientBase, util) {
    var userAddBox = new twiclientBase();

    userAddBox.inputElement = null;

    userAddBox.createHTMLNode = function() {
        var node = document.createElement('form');
        node.appendChild(document.createTextNode("Enter userid: "));
        userAddBox.inputElement = document.createElement('input');
        util.initSubmitHandler(node,userAddBox.submitHandler,userAddBox);
        node.appendChild(userAddBox.inputElement);
        return node;
    };

    userAddBox.submitHandler = function(e) {
        util.pubsub.publish("addingNewUser",userAddBox.inputElement.value);
        userAddBox.inputElement.value = "";
        e.preventDefault();
    };

    return userAddBox;
});
*/