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