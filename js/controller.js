define(["dojo","js/util","js/userList","js/hashList","js/tweetList","js/filter"],
    function(dojo, util, userList, hashList, tweetList, filter) {
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

        util.pubsub.subscribe("newTweetAdded",hashList.registerTweet,hashList);
        util.pubsub.subscribe("hashChange",hashList.showHash,hashList);

        util.pubsub.subscribe("newTweetsReceived",tweetList.receiveTweets,tweetList);

        util.pubsub.subscribe("addingNewUser",userList.addNewUser,userList);

        return {};
    });