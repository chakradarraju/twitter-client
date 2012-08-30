function User(userid) {
    this.userid = userid;
    this.display = true;
    this.tweets = [];
    this.checkbox = null;
    this.node = this.getHTMLNode();
}

User.prototype.getHTMLNode = function() {
    if(this.node != null)
        return this.node;
    return this.createHTMLNode();
};

User.prototype.createHTMLNode = function() {
    var node = document.createElement('li');
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.addEventListener("click", Util.bind(function(e) {
        this.onclick();
    }, this));
    node.className = " active";
    node.appendChild(checkbox);
    node.appendChild(document.createTextNode(this.userid));
    node.appendChild(document.createTextNode(" (Fetching tweets...)"));
    this.checkbox = checkbox;
    this.node = node;
    return node;
}

User.prototype.onclick = function() {
    this[this.checkbox.checked ? "show" : "hide"]();
};

User.prototype.show = function() {
    this.display = true;
    userlist.showing(this); // Should userlist listen to this(prototype) method?
    if(!this.node.className.match(/\bactive\b/))
        this.node.className += "active";
}

User.prototype.hide = function() {
    this.display = false;
    userlist.hiding(this);
    this.node.className = this.node.className.replace(/\bactive\b/,'');
}

User.prototype.fetchTweets = function() {
    MyAjax.get("broker.php?username="+this.userid,{},this.receiveTweets,this);
};

User.prototype.receiveTweets = function(data) {
    var tweets = JSON.parse(data);
    if(data.length == 0) {
        alert("User doesn't have any tweets");
    }
    for(var i=0;i<tweets.length;i++)
        this.tweets.push(new Tweet(tweets[i],this));
    tweetlist.addTweets(this.tweets);
    this.node.removeChild(this.node.lastChild); // Removing (Fetching tweets...)
};