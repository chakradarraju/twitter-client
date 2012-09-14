dojo.provide("js.filter");

js.filter = function(tweets,selectedUsers,selectedHash) {
    for(var i=0;i<tweets.length;i++) {
        var tweet = tweets[i], userid = tweet.getUserId();
        tweet[((typeof selectedUsers[userid] == "undefined" || selectedUsers[userid]) && (!selectedHash || tweet.containsHash(selectedHash)))
            ? "show" : "hide"]();
    }
};