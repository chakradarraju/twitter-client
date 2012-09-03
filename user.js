function User(userid) {
    this.userid = userid;
    this.display = true;
    this.tweets = [];
    this.checkbox = null;
    this.node = this.getHTMLNode();
}

User.prototype.getHTMLNode = function() {
    return (this.node || this.createHTMLNode());
};

User.prototype.createHTMLNode = function() {
    var node = document.createElement('li');
    var checkbox = document.createElement('input');
    this.initClickHandler(checkbox);
    checkbox.type = "checkbox";
    checkbox.checked = true;
    node.className = " active";
    node.appendChild(checkbox);
    node.appendChild(document.createTextNode(this.userid));
    node.appendChild(document.createTextNode(" (Fetching tweets...)"));
    this.checkbox = checkbox;
    this.node = node;
    return node;
}

User.prototype.initClickHandler = function(domelement) {
    domelement.addEventListener("click", Util.bind(function(e) {
        this.onclick();
    }, this));
}

User.prototype.onclick = function() {
    this[this.checkbox.checked ? "show" : "hide"]();
};

User.prototype.show = function() {
    this.display = true;
    twitter.userlist.onShow(this);
    if(!this.node.className.match(/\bactive\b/))
        this.node.className += "active";
}

User.prototype.hide = function() {
    this.display = false;
    twitter.userlist.onHide(this);
    this.node.className = this.node.className.replace(/\bactive\b/,'');
}

User.prototype.fetchTweets = function() {
    Util.ajaxGet("broker.php?username="+this.userid,{},this.receiveTweets,this);
};

User.prototype.receiveTweets = function(data) {
    Util.pubsub.publish("newTweetsReceived",JSON.parse(data));
    this.node.removeChild(this.node.lastChild); // Removing (Fetching tweets...)
};

User.prototype.putTweet = function(tweet) {
    this.tweets.push(tweet);
};

User.prototype.getTweets = function() {
    return this.tweets;
};