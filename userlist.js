function Userlist() {
    this.list = {};
    this.node = document.getElementById('userList');
}

Userlist.prototype.addToList = function(user) {
    if(this.getUser(user.userid) != null) {
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