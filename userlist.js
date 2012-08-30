function Userlist() {
    this.list = {};
    this.node = this.getHTMLNode();
}

Userlist.prototype.getHTMLNode = function() {
    return (this.node || this.createHTMLNode());
}

Userlist.prototype.createHTMLNode = function() {
    return document.createElement('div');
}

Userlist.prototype.addToList = function(user) {
    if(this.getUser(user.userid)) {
        alert("User already in list");
        return;
    }
    this.list[user.userid] = user;
    this.node.appendChild(user.getHTMLNode());
    user.fetchTweets();
};

Userlist.prototype.getUser = function(userid) {
    return this.list[userid];
};

Userlist.prototype.showing = function(user) {
    return;
}

Userlist.prototype.hiding = function(user) {
    return;
}