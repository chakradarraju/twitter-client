function Hash(hash) {
    this.hash = hash;
    this.list = [];
    this.tweetCounter =null;
    this.node = this.getHTMLNode();
    Util.pubsub.subscribe("filtering",this.updateCounter,this);
}

Hash.prototype.getHTMLNode = function() {
    return (this.node || this.createHTMLNode());
}

Hash.prototype.createHTMLNode = function() {
    var node = document.createElement('li');
    var link = document.createElement('a');
    this.initClickHandler(link);
    if(this.hash == null)
        link.innerHTML = "All";
    else
        link.innerHTML = this.hash;
    link.href = "javascript:void(0);";
    this.tweetCounter = document.createElement('span');
    this.tweetCounter.innerHTML = this.list.length;
    node.appendChild(link);
    node.appendChild(document.createTextNode(" ("));
    node.appendChild(this.tweetCounter);
    node.appendChild(document.createTextNode(")"));
    this.node = node;
    return node;
};

Hash.prototype.initClickHandler = function(domelement) {
    domelement.addEventListener("click", function(e) {
        twitter.hashlist.showHash(this.innerHTML);
    });
};

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
    this.tweetCounter.innerHTML = count;
    if(count > 0 || this.hash == null)
        this.show();
    else
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