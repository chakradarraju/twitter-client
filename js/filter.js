define(["dojo","js/util","js/userList","js/hashList","js/tweetList"], function(dojo, util, userList, hashList, tweetList) {
    return {
        selectedUsers: {},
        selectedHash: null,

        setup: function() {
            util.pubsub.subscribe("showingUser",this.showUser,this);
            util.pubsub.subscribe("hidingUser",this.hideUser,this);
            util.pubsub.subscribe("hashChange",this.selectedHashChange,this);
            util.connect(tweetList,"addTweets",this,"filter");
        },

        tweetFilter: function(tweet) {
            return tweet.user.display && (!this.selectedHash || tweet.containsHash(this.selectedHash));
        },

        filter: function() {
            var tweets = tweetList.getTweets();
            for(var i=0;i<tweets.length;i++) {
                var tweet = tweets[i];
                if(this.tweetFilter(tweet))
                    tweet.show();
                else
                    tweet.hide();
            }
            util.pubsub.publish("filtered",null);
        },

        selectedHashChange: function(hash) {
            if(hash == "All")
                hash = null;
            this.selectedHash = hash;
            this.filter();
        },

        hideUser: function(user) {
            this.selectedUsers[user] = false;
            this.filter();
        },

        showUser: function(user) {
            this.selectedUsers[user] = true;
            this.filter();
        },
    };
});