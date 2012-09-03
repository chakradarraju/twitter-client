function Tweetlist() {
    this.list = [];
    this.node = document.getElementById("tweetList");
    Util.pubsub.subscribe("newTweetsReceived",this.receiveTweets,this);
}

Tweetlist.prototype.getHTMLNode = function() {
    return (this.node || this.createHTMLNode());
}

Tweetlist.prototype.createHTMLNode = function() {
    var node = document.createElement('ul');
    this.node = node;
    return node;
}

Tweetlist.prototype.receiveTweets = function(tweets) {
    if(tweets.length == 0) {
        alert("User doesn't have any tweets");
    }
    var userid = tweets[0].user.screen_name;
    var user = twitter.userlist.getUser(userid);
    for(var i=0;i<tweets.length;i++)
        user.putTweet(new Tweet(tweets[i],user));
    this.addTweets(user.getTweets());
}

Tweetlist.prototype.addTweet = function(tweet) {
    var last = this.list.length-1;
    var lo = 0, hi = last;
    while(lo<hi) {
        var md = parseInt((hi+lo)/2);
        if(tweet.isTweetOlder(this.list[md]))
            hi = md;
        else
            lo = md+1;
    }
    if(this.list.length == 0 ||(lo == last && this.list[last].isTweetOlder(tweet))) {
        this.node.appendChild(tweet.getHTMLNode());
        this.list.push(tweet);
    } else {
        this.node.insertBefore(tweet.getHTMLNode(),this.list[lo].getHTMLNode());
        this.list.splice(lo,0,tweet);
    }
};

Tweetlist.prototype.addTweets = function(tweets) {
    for(var i=0;i<tweets.length;i++)
        this.addTweet(tweets[i]);
}

Tweetlist.prototype.getTweets = function() {
    return this.list;
}