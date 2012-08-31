function Tweetlist() {
    this.list = [];
    this.node = document.getElementById("tweetList");
    Util.connect(User.prototype,"receiveTweets",this,"receiveTweets");
}

Tweetlist.prototype.getHTMLNode = function() {
    if(this.node != null)
        return this.node;
    this.node = this.createHTMLNode();
    return this.node;

}

Tweetlist.prototype.createHTMLNode = function() {
    var node = document.createElement('ul');
    return node;
}

Tweetlist.prototype.receiveTweets = function(data) {
    var tweets = JSON.parse(data);
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
    this.list.push(tweet);
};

Tweetlist.prototype.addTweets = function(tweets) {
    for(var i=0;i<tweets.length;i++)
        this.addTweet(tweets[i]);
    this.sortTweets();
    this.refreshList();
}

Tweetlist.prototype.sortTweets = function() {
    this.list.sort(function(a,b) { return b.createdAt() - a.createdAt(); });
};

Tweetlist.prototype.refreshList = function() {
    this.node.innerHTML = "";
    for(var i=0;i<this.list.length;i++) {
        this.node.appendChild(this.list[i].getHTMLNode());
    }
};

Tweetlist.prototype.getTweets = function() {
    return this.list;
}