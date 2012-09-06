define(["dojo","js/twiclientBase","js/User","js/util"], function(dojo,twiclientBase,User,util) {
    var userList = new twiclientBase();
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