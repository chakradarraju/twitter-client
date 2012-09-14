dojo.require("js.Util");
var util = new js.Util();
dojo.require("js.UserAddBox");
dojo.require("js.UserList");
dojo.require("js.TweetList");
dojo.require("js.HashList");
dojo.require("js.filter");
dojo.require("dojo.parser");
dojo.ready(function() {
    dojo.parser.parse();

    userList = dijit.byNode(dojo.byId("userListContainer"));
    tweetList = dijit.byNode(dojo.byId("tweetListContainer"));
    hashList = dijit.byNode(dojo.byId("hashContainer"));

    var filter = new js.filter();
    var selectedUsers = {}, selectedHash = null;

    var runFilter = function() {
        filter.filter(tweetList.getTweets(),selectedUsers,selectedHash);
        util.pubsub.publish("filtered",null);
    }
    util.pubsub.subscribe("newTweetsAdded",runFilter,this);

    util.pubsub.subscribe("showingUser",function(userid) {
        if(selectedUsers[userid])
            return;
        selectedUsers[userid] = true;
        runFilter();
    },this);

    util.pubsub.subscribe("hidingUser",function(userid) {
        if(typeof selectedUsers[userid] != "undefined" && !selectedUsers[userid])
            return;
        selectedUsers[userid] = false;
        runFilter();
    },this);

    util.pubsub.subscribe("hashChange",function(hash) {
        if(selectedHash === hash)
            return;
        selectedHash = hash;
        runFilter();
    },this);

});