var Filter = function() {
    this.selectedUsers = {};
    this.selectedHash = null;
    Util.connect(twitter.userlist,"showing",this,"showUser");
    Util.connect(twitter.userlist,"hiding",this,"hideUser");
    Util.connect(twitter.hashlist,"showHash",this,"selectedHashChange");
    Util.connect(twitter.tweetlist,"refreshList",this,"filter");
}

Filter.prototype.tweetFilter = function(tweet) {
    return tweet.user.display && (!this.selectedHash || tweet.containsHash(this.selectedHash));
}

Filter.prototype.filter = function() {
    var tweets = twitter.tweetlist.getTweets();
    for(var i=0;i<tweets.length;i++) {
        var tweet = tweets[i];
        if(this.tweetFilter(tweet))
            tweet.show();
        else
            tweet.hide();
    }
}

Filter.prototype.selectedHashChange = function(hash) {
    if(hash == "All")
        hash = null;
    this.selectedHash = hash;
    this.filter();
}

Filter.prototype.hideUser = function(user) {
    this.selectedUsers[user] = false;
    this.filter();
}

Filter.prototype.showUser = function(user) {
    this.selectedUsers[user] = true;
    this.filter();
}