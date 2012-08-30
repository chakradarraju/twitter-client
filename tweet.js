function Tweet(tweet, user) {
    this.tweet = tweet;
    this.user = user;
    this.node = this.getHTMLNode();
}

Tweet.prototype.getHTMLNode = function() {
    if(this.node != null)
        return this.node;
    return this.createHTMLNode();
}

Tweet.prototype.createHTMLNode = function() {
    var node = document.createElement('div');
    node.className = "tweet active";
    node.appendChild(document.createTextNode(this.tweetInfo()));
    node.appendChild(document.createElement('br'));
    node.appendChild(this.getTweet());
    return node;
}

Tweet.prototype.getTweet = function() {
    var words = this.tweet.text.split(" ");
    var node = document.createElement('span');
    for(var i=0;i<words.length;i++) {
        var word = words[i];
        if(word.indexOf("#") == 0) {
            var link = document.createElement('a');
            link.addEventListener("click", function(e) {
                hashlist.showHash(this.innerHTML);
            });
            link.innerHTML = word;
            link.href = "javascript:void(0);"
            node.appendChild(link);
            node.appendChild(document.createTextNode(" "));
        } else
            node.appendChild(document.createTextNode(word+" "));
    }
    return node;
}

Tweet.prototype.getHashes = function() {
    var words = this.tweet.text.split(" ");
    var hashes = [];
    for(var i=0;i<words.length;i++) {
        var word = words[i];
        if(word.indexOf("#") == 0)
            hashes.push(word);
    }
    return hashes;
}

Tweet.prototype.tweetInfo = function() {
    return "Tweet by: "+this.user.userid+" Tweeted at: "+this.tweet.created_at.substr(0,19);
}

Tweet.prototype.show = function() {
    if(!this.node.className.match(/\bactive\b/))
        this.node.className += " active";
}

Tweet.prototype.hide = function() {
    this.node.className = this.node.className.replace(/\bactive\b/,'');
}

Tweet.prototype.containsHash = function(hash) {
    if(hash.indexOf("#") != 0)
        return false;
    var words = this.tweet.text.split(" ");
    for(var i=0;i<words.length;i++) {
        if(words[i] == hash)
            return true;
    }
    return false;
}