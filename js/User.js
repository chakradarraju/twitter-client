dojo.provide("js.User");

dojo.require("dijit.dijit");

dojo.declare("js.User", [dijit._Widget, dijit._Templated], {
    widgetsInTemplate: true,
    templateString: dojo.cache("templates", "User.html"),

    createHTMLNode: function() {
        var node = document.createElement('li');
        var checkbox = document.createElement('input');
        util.initClickHandler(checkbox,this.checkboxClick,this);
        checkbox.type = "checkbox";
        checkbox.checked = true;
        node.className = " active";
        node.appendChild(checkbox);
        node.appendChild(document.createTextNode(this.userid));
        node.appendChild(document.createTextNode(" (Fetching tweets...)"));
        this.checkbox = checkbox;
        return node;
    },

    constructor: function(user) {
        this.display = true;
        this.checkbox = null;
        this.userid = user.userid;
    },

    postCreate: function() {
        util.initClickHandler(this.checkbox,this.checkboxClick,this);
    },

    checkboxClick: function() {
        this[this.checkbox.checked ? "show" : "hide"]();
    },

    show: function() {
        this.display = true;
        this.node.className = "active";
        util.pubsub.publish("showingUser",this.userid);
    },

    hide: function() {
        this.display = false;
        this.node.className = "";
        util.pubsub.publish("hidingUser",this.userid);
    },

    fetchTweets: function() {
        util.ajaxGet("broker.php?username="+this.userid,{},this.receiveTweets,this);
    },

    receiveTweets: function(data) {
        util.pubsub.publish("newTweetsReceived",JSON.parse(data));
        this.node.removeChild(this.receiving); // Removing (Fetching tweets...)
    },
});