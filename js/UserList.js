dojo.provide("js.UserList");

dojo.require("dijit.dijit");
dojo.require("js.User");

dojo.declare("js.UserList", [dijit._Widget, dijit._Templated], {
    widgetsInTemplate: true,
    templateString: dojo.cache("templates", "UserList.html"),

    addNewUser: function(userid) {
        if(this.getUser(userid)) {
            alert("User already added");
            return;
        }
        this.addToList(new js.User({"userid":userid}));
    },

    addToList: function(user) {
        this.users[user.userid] = user;
        user.placeAt(this.node);
        user.fetchTweets();
    },

    getUser: function(userid) {
        return this.users[userid];
    },

    constructor: function() {
        util.pubsub.subscribe("addingNewUser",this.addNewUser,this);
        this.users = {};
    },

});