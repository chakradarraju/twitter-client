function Hashlist() {
    this.hashes = {};
    this.hashlistElement = null;
    this.selectedHash = null;
    this.selectedHashElement = null;
    this.node = this.getHTMLNode();
    this.registerHash(null);
    Util.connect(twitter.tweetlist,"addTweet",this,"registerTweet");
}

Hashlist.prototype.getHTMLNode = function() {
    if(this.node != null)
        return this.node;
    this.node = this.createHTMLNode();
    return this.node;
}

Hashlist.prototype.registerHash = function(hash) {
    this.hashes[hash] = new Hash(hash);
    this.hashlistElement.appendChild(this.hashes[hash].getHTMLNode());
}

Hashlist.prototype.createHTMLNode = function() {
    var node = document.createElement('a');
    this.selectedHashElement = document.createElement('div');
    this.selectedHashElement.innerHTML = "Choose a hashtag";
    node.appendChild(this.selectedHashElement);
    this.hashlistElement = document.createElement('ul');
    this.hashlistElement.id = "hashList";
    node.appendChild(this.hashlistElement);
    return node;
}

Hashlist.prototype.registerTweet = function(tweet) {
    var hashes = tweet.getHashes();
    this.registerTweetWithHashes(hashes,tweet);
}

Hashlist.prototype.registerTweetWithHashes = function(hashes,tweet) {
    this.hashes[null].registerTweet(tweet);
    for(var i=0;i<hashes.length;i++) {
        var hash = hashes[i];
        if(this.hashes[hash] == null)
            this.registerHash(hash);
        this.hashes[hash].registerTweet(tweet);
    }
}

Hashlist.prototype.showHash = function(hash) {
    if(hash == "All")
        hash = null;
    if(hash == null)
        this.selectedHashElement.innerHTML = "Choose a hashtag";
    else
        this.selectedHashElement.innerHTML = hash;
    this.selectedHash = hash;
}

Hashlist.prototype.getTweets = function(hash) {
    return this.hashes[hash].getTweets();
}