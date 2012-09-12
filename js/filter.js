define([], function() {
    return {
        filter: function(tweets,selectedUsers,selectedHash) {
            for(var i=0;i<tweets.length;i++) {
                var tweet = tweets[i], userid = tweet.getUserId();
                ((typeof selectedUsers[userid] == "undefined" || selectedUsers[userid]) && (!selectedHash || tweet.containsHash(selectedHash)))
                    ? tweet.show() : tweet.hide();
            }
        },

    };
});