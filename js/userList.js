define(["dojo","js/twitterObject","js/user"], function(dojo,twitterObject,User) {
    var userList = new twitterObject();
    userList.users = {};
    userList.createHTMLNode = function() {
        return document.createElement('ul');
    };

    userList.addNewUser = function(userid) {
        if(userList.getUser(userid)) {
            alert("User already added");
            return;
        }
        userList.addToList(new User(userid));
    };

    userList.addToList = function(user) {
        userList.users[user.userid] = user;
        userList.node.appendChild(user.getHTMLNode());
        user.fetchTweets();
    };

    userList.getUser = function(userid) {
        return userList.users[userid];
    };

    return userList;
});