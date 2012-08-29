function Tweet(tweet, user) {
    this.tweet = tweet;
    this.user = user;
    this.node = null;
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
    node.appendChild(document.createTextNode(this.tweet.text));
    this.node = node;
    return node;
}

Tweet.prototype.getHash = function() {
    var text = this.tweet.text;
    var position = text.lastIndexOf("#");
    if(position<0)
        return null;
    return text.substr(position);
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