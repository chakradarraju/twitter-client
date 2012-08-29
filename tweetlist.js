function Tweetlist() {
    this.list = [];
    this.node = document.getElementById("tweetList");
    this.hashlist = new Hashlist();
    this.hashToDisplay = null;
}

Tweetlist.prototype.addTweet = function(tweet) {
    this.list.push(tweet);
    this.hashlist.registerTweet(tweet);
};

Tweetlist.prototype.sort = function() {
    this.list.sort(function(a,b) { return new Date(b.tweet.created_at) - new Date(a.tweet.created_at); });
};

Tweetlist.prototype.showHash = function(hash) {
    this.hashToDisplay = hash;
    this.refreshList();
}

Tweetlist.prototype.refreshList = function() {
    this.node.innerHTML = "";
    if(this.hashToDisplay == null) {
        for(var i=0;i<this.list.length;i++) {
            var tweet = this.list[i];
            if(tweet.user.display) {
                this.node.appendChild(tweet.getHTMLNode());
            }
        }
    } else {
        var tweetsToDisplay = this.hashlist.getTweets(this.hashToDisplay);
        for(var i=0;i<tweetsToDisplay.length;i++) {
            this.node.appendChild(tweetsToDisplay[i].getHTMLNode());
        }
    }
};