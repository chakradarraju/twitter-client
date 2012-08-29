function Hashlist() {
    this.hashes = {null:new Hash(null)};
    this.node = document.getElementById("hashList");
    this.node.appendChild(this.hashes[null].getHTMLNode());
    this.selectedHash = null;
    this.selectedHashElement = document.getElementById("selectedHash");
}

Hashlist.prototype.registerTweet = function(tweet) {
    var hash = tweet.getHash();
    if(hash == null)
        return;
    this.registerTweetWithHash(hash,tweet);
}

Hashlist.prototype.registerTweetWithHash = function(hash,tweet) {
    if(this.hashes[hash] == null) {
        this.hashes[hash] = new Hash(hash);
        this.node.appendChild(this.hashes[hash].getHTMLNode());
    }
    this.hashes[hash].registerTweet(tweet);
}

Hashlist.prototype.showHash = function(hash) {
    if(hash == null)
        this.selectedHashElement.innerHTML = "Choose a hashtag";
    else
        this.selectedHashElement.innerHTML = hash;
    tweetlist.showHash(hash);
}

Hashlist.prototype.getTweets = function(hash) {
    return this.hashes[hash].getTweets();
}