function Hashlist() {
    this.hashes = {null:new Hash(null)};
    this.node = document.getElementById("hashList");
    this.node.appendChild(this.hashes[null].getHTMLNode());
    this.selectedHash = null;
    this.selectedHashElement = document.getElementById("selectedHash");
}

Hashlist.prototype.registerTweet = function(tweet) {
    var hashes = tweet.getHashes();
    this.registerTweetWithHashes(hashes,tweet);
}

Hashlist.prototype.registerTweetWithHashes = function(hashes,tweet) {
    for(var i=0;i<hashes.length;i++) {
        var hash = hashes[i];
        if(this.hashes[hash] == null) {
            this.hashes[hash] = new Hash(hash);
            this.node.appendChild(this.hashes[hash].getHTMLNode());
        }
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
    tweetlist.showHash(hash);
}

Hashlist.prototype.getTweets = function(hash) {
    return this.hashes[hash].getTweets();
}