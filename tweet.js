function Tweet(tweet, user) {
    this.tweetData = tweet;
    this.user = user;
    this.node = this.getHTMLNode();
    this.hashes = this.getHashes();
}

Tweet.prototype.getHTMLNode = function() {
    return (this.node || this.createHTMLNode());
};

Tweet.prototype.createHTMLNode = function() {
    var node = document.createElement('div');
    node.className = "tweet active";
    node.appendChild(document.createTextNode(this.tweetInfo()));
    node.appendChild(document.createElement('br'));
    node.appendChild(this.getTweetTextNode());
    return node;
};

Tweet.prototype.getTweetTextNode = function() {
    var words = this.tweetData.text.split(" ");
    var node = document.createElement('span');
    for(var i=0;i<words.length;i++) {
        var word = words[i];
        if(word.indexOf("#") == 0) {
            var link = document.createElement('a');
            this.initClickHandler(link);
            link.innerHTML = word;
            link.href = "javascript:void(0);"
            node.appendChild(link);
            node.appendChild(document.createTextNode(" "));
        } else
            node.appendChild(document.createTextNode(word+" "));
    }
    return node;
};

Tweet.prototype.initClickHandler = function(domelement) {
    domelement.addEventListener("click", function(e) {
        twitter.hashlist.showHash(this.innerHTML);
    });
}

Tweet.prototype.getHashes = function() {
    if(this.hashes != null)
        return this.hashes;
    var words = this.tweetData.text.split(" ");
    var hashes = [];
    for(var i=0;i<words.length;i++) {
        var word = words[i];
        if(word.indexOf("#") == 0)
            hashes.push(word);
    }
    return hashes;
};

Tweet.prototype.isTweetOlder = function(tweet) {
    return tweet.createdAt() < this.createdAt();
}

Tweet.prototype.tweetInfo = function() {
    return "Tweet by: "+this.user.userid+" Tweeted at: "+this.tweetData.created_at.substr(0,19);
};

Tweet.prototype.show = function() {
    if(!this.node.className.match(/\bactive\b/))
        this.node.className += " active";
};

Tweet.prototype.hide = function() {
    this.node.className = this.node.className.replace(/\bactive\b/,'');
};

Tweet.prototype.containsHash = function(hash) {
    if(hash.indexOf("#") != 0)
        return false;
    var hashes = this.getHashes();
    for(var i=0;i<hashes.length;i++) {
        if(hashes[i] == hash)
            return true;
    }
    return false;
};

Tweet.prototype.createdAt = function() {
    return new Date(this.tweetData.created_at);
};