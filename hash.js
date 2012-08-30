function Hash(hash) {
    this.hash = hash;
    this.list = [];
    this.lengthCounter =null;
    this.node = this.getHTMLNode();
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
        twitter.hashlist.showHash(this.innerHTML);
    });
    if(this.hash == null)
        link.innerHTML = "All";
    else
        link.innerHTML = this.hash;
    this.lengthCounter = document.createElement('span');
    this.lengthCounter.innerHTML = this.list.length;
    node.appendChild(link);
    node.appendChild(document.createTextNode(" ("));
    node.appendChild(this.lengthCounter);
    node.appendChild(document.createTextNode(")"));
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
    if(!found && this.hash != null)
        return;
    this.list.push(tweet);
    this.lengthCounter.innerHTML = this.list.length;
}

Hash.prototype.getTweets = function() {
    return this.list;
}