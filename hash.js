function Hash(hash) {
    this.hash = hash;
    this.node = this.getHTMLNode();
    this.list = [];
}

Hash.prototype.getHTMLNode = function() {
    if(this.node != null)
        return this.node;
    return this.createHTMLNode();
}

Hash.prototype.createHTMLNode = function() {
    var node = document.createElement('li');
    var link = document.createElement('a');
    link.addEventListener("click", function(e) {
        tweetlist.hashlist.showHash(this.innerHTML);
    });
    if(this.hash == null)
        link.innerHTML = "All";
    else
        link.innerHTML = this.hash;
    node.appendChild(link);
    this.node = node;
    return node;
}

Hash.prototype.registerTweet = function(tweet) {
    var hashes = tweet.getHashes();
    var found = false;
    for(var i=0;i<hashes.length;i++) {
        if(hashes[i] == this.hash)
            found = true;
    }
    if(!found)
        return;
    this.list.push(tweet);
}

Hash.prototype.getTweets = function() {
    return this.list;
}