dojo.provide("js.TweetList");

dojo.require("js.Tweet");

dojo.declare("js.TweetList", [dijit._Widget, dijit._Templated], {
    widgetsInTemplate: true,
    templateString: dojo.cache("templates", "TweetList.html"),

    constructor: function() {
        this.tweets = [];
        util.pubsub.subscribe("newTweetsReceived",this.receiveTweets,this);
    },

    receiveTweets: function(tweets) {
        if(tweets.length == 0) {
            alert("User doesn't have any tweets");
        }
        var userTweetList = [];
        for(var i=0;i<tweets.length;i++)
            userTweetList.push(new js.Tweet({"tweetData":tweets[i]}));
        this.addTweets(userTweetList);
    },

    addTweet: function(tweet) {
        var last = this.tweets.length-1;
        var lo = 0, hi = last;
        while(lo<hi) {
            var md = parseInt((hi+lo)/2);
            if(tweet.isTweetOlder(this.tweets[md]))
                hi = md;
            else
                lo = md+1;
        }
        if(this.tweets.length == 0 ||(lo == last && this.tweets[last].isTweetOlder(tweet))) {
            tweet.placeAt(this.node);
            this.tweets.push(tweet);
        } else {
            tweet.placeAt(this.tweets[lo].node,"before");
            this.tweets.splice(lo,0,tweet);
        }
        util.pubsub.publish("newTweetAdded",tweet);
    },

    addTweets: function(tweets) {
        for(var i=0;i<tweets.length;i++)
            this.addTweet(tweets[i]);
        util.pubsub.publish("newTweetsAdded",tweets);
    },

    getTweets: function() {
        return this.tweets;
    },

});