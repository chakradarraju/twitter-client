var Filter = function() {
    this.selectedUsers = {};
    this.selectedHash = null;
    Util.connect(userlist,"showing",this,"showUser");
    Util.connect(userlist,"hiding",this,"hideUser");
    Util.connect(hashlist,"showHash",this,"selectedHashChange");

    Util.connect(tweetlist,"refreshList",this,"filter");
    Util.connect(this,"selectedHashChange",this,"filter");
    Util.connect(this,"hideUser",this,"filter");
    Util.connect(this,"showUser",this,"filter");
}

Filter.prototype.filter = function() {
    var tweets = tweetlist.getTweets();
    for(var i=0;i<tweets.length;i++) {
        var tweet = tweets[i];
        if(tweet.user.display && (!this.selectedHash || tweet.containsHash(this.selectedHash)))
            tweet.show();
        else
            tweet.hide();
    }
}

Filter.prototype.selectedHashChange = function(hash) {
    if(hash == "All")
        hash = null;
    this.selectedHash = hash;
}

Filter.prototype.hideUser = function(user) {
    this.selectedUsers[user] = false;
}

Filter.prototype.showUser = function(user) {
    this.selectedUsers[user] = true;
}