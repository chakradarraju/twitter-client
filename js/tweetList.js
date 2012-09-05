define(["dojo","js/twitterObject","js/tweet","js/util","js/userList"], function(dojo, twitterObject, Tweet, util, userList) {
    var tweetList = new twitterObject();
    tweetList.tweets = [];

    tweetList.createHTMLNode = function() {
        return document.createElement('ul');
    };

    tweetList.receiveTweets = function(tweets) {
        if(tweets.length == 0) {
            alert("User doesn't have any tweets");
        }
        var userid = tweets[0].user.screen_name;
        var user = userList.getUser(userid);
        for(var i=0;i<tweets.length;i++)
            user.putTweet(new Tweet(tweets[i],user));
        tweetList.addTweets(user.getTweets());
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
    };

    tweetList.addTweets = function(tweets) {
        for(var i=0;i<tweets.length;i++)
            tweetList.addTweet(tweets[i]);
    };

    tweetList.getTweets = function() {
        return tweetList.tweets;
    };

    util.pubsub.subscribe("newTweetsReceived",tweetList.receiveTweets,tweetList);

    return tweetList;
});