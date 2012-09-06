define(["dojo","js/twiclientBase","js/Tweet","js/util"], function(dojo, twiclientBase, Tweet, util) {
    var tweetList = new twiclientBase();
    tweetList.tweets = [];

    tweetList.createHTMLNode = function() {
        return document.createElement('ul');
    };

    tweetList.receiveTweets = function(tweets) {
        if(tweets.length == 0) {
            alert("User doesn't have any tweets");
        }
        var userTweetList = [];
        for(var i=0;i<tweets.length;i++)
            userTweetList.push(new Tweet(tweets[i]));
        tweetList.addTweets(userTweetList);
    };

    tweetList.addTweet = function(tweet) {
        var last = tweetList.tweets.length-1;
        var lo = 0, hi = last;
        while(lo<hi) {
            var md = parseInt((hi+lo)/2);
            if(tweet.isTweetOlder(tweetList.tweets[md]))
                hi = md;
            else
                lo = md+1;
        }
        if(tweetList.tweets.length == 0 ||(lo == last && tweetList.tweets[last].isTweetOlder(tweet))) {
            tweetList.node.appendChild(tweet.getHTMLNode());
            tweetList.tweets.push(tweet);
        } else {
            tweetList.node.insertBefore(tweet.getHTMLNode(),tweetList.tweets[lo].getHTMLNode());
            tweetList.tweets.splice(lo,0,tweet);
        }
        util.pubsub.publish("newTweetAdded",tweet);
    };

    tweetList.addTweets = function(tweets) {
        for(var i=0;i<tweets.length;i++)
            tweetList.addTweet(tweets[i]);
        util.pubsub.publish("newTweetsAdded",tweets);
    };

    tweetList.getTweets = function() {
        return tweetList.tweets;
    };

    return tweetList;
});