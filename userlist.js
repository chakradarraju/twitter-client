function Userlist() {
    this.list = {};
    this.node = this.getHTMLNode();
};

Userlist.prototype.getHTMLNode = function() {
    return (this.node || this.createHTMLNode());
};

Userlist.prototype.createHTMLNode = function() {
    return document.createElement('ul');
};

Userlist.prototype.addNewUser = function(userid) {
    if(this.getUser(userid)) {
        alert("User already in list");
        return;
    }
    this.addToList(new User(userid));
};

Userlist.prototype.addToList = function(user) {
    this.list[user.userid] = user;
    this.node.appendChild(user.getHTMLNode());
    user.fetchTweets();
};

Userlist.prototype.getUser = function(userid) {
    return this.list[userid];
};

Userlist.prototype.onShow = function(user) {
};

Userlist.prototype.onHide = function(user) {
};