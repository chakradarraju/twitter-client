function Hash(hash) {
    this.hash = hash;
    this.list = [];
    this.tweetCounter =null;
    this.node = this.getHTMLNode();
    if(hash) // For every hash except for no constraint on hash
        Util.connect(twitter.filter,"filter",this,"updateCounter");
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
    this.tweetCounter = document.createElement('span');
    this.tweetCounter.innerHTML = this.list.length;
    node.appendChild(link);
    node.appendChild(document.createTextNode(" ("));
    node.appendChild(this.tweetCounter);
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
    this.updateCounter();
}

Hash.prototype.updateCounter = function() {
    var count = 0;
    for(var i=0;i<this.list.length;i++)
        if(twitter.filter.tweetFilter(this.list[i]))
            count++;
    if(count > 0) {
        this.show();
        this.tweetCounter.innerHTML = count;
    } else
        this.hide();
}

Hash.prototype.hide = function() {
    this.node.className = "hash";
}

Hash.prototype.show = function() {
    this.node.className = "hash active";
}

Hash.prototype.getTweets = function() {
    return this.list;
}