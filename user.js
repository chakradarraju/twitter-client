function User(userid) {
    this.userid = userid;
    this.display = true;
    this.tweets = [];
    this.node = this.getHTMLNode();
}

User.prototype.getHTMLNode = function() {
    if(this.node != null)
        return this.node;
    return this.createHTMLNode();
};

var bind = function(fn, con) {
    return function() {
        fn.apply(con, arguments);
    }
}

User.prototype.createHTMLNode = function() {
    var node = document.createElement('li');
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.addEventListener("click", bind(function(e) {
        this.onclick();
    }, this));
    node.className = " active";
    node.appendChild(checkbox);
    node.appendChild(document.createTextNode(this.userid));
    node.appendChild(document.createTextNode(" (Fetching tweets...)"));
    this.node = node;
    return node;
}

User.prototype.onclick = function() {
    var selected = this.node.firstChild.checked;
    if(selected) {
        this.show();
    } else {
        this.hide();
    }
};

User.prototype.show = function() {
    if(!this.node.className.match(/\bactive\b/))
        this.node.className += "active";
    this.tweets.forEach(function(tweet) {
        tweet.show();
    });
}

User.prototype.hide = function() {
    this.node.className = this.node.className.replace(/\bactive\b/,'');
    this.tweets.forEach(function(tweet) {
        tweet.hide();
    });
}

User.prototype.fetchTweets = function() {
    MyAjax.get("broker.php?username="+this.userid,{},this.receiveTweets,this);
};

User.prototype.receiveTweets = function(data) {
    var tweets = JSON.parse(data);
    if(data.length == 0) {
        alert("User doesn't have any tweets");
    }
    for(var i=0;i<tweets.length;i++) {
        var tweetObj = new Tweet(tweets[i],this);
        this.tweets.push(tweetObj);
        tweetlist.addTweet(tweetObj);
    }
    tweetlist.sort();
    tweetlist.refreshList();
    this.node.removeChild(this.node.lastChild);
};