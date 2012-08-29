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

var bind = function(fn, con) {
    return function() {
        fn.apply(con, arguments);
    }
}

Hash.prototype.createHTMLNode = function() {
    var node = document.createElement('li');
    var link = document.createElement('a');
    link.addEventListener("click", bind(function(e) {
        tweetlist.hashlist.showHash(this.hash);
    }, this));
    if(this.hash == null)
        link.innerHTML = "All";
    else
        link.innerHTML = this.hash;
    node.appendChild(link);
    this.node = node;
    return node;
}

Hash.prototype.registerTweet = function(tweet) {
    var hash = tweet.getHash();
    if(hash != this.hash)
        return;
    this.list.push(tweet);
}

Hash.prototype.getTweets = function() {
    return this.list;
}