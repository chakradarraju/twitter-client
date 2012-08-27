function Userlist() {
    return {
        "list": [],
        "addToList": function(user) {
            this.list.push(user);
            var node = document.createElement('li');
            node.innerHTML = user.getHTML();
            document.getElementById("userList").appendChild(node);
            user.addUserEventHandlers();
            user.fetchTweets();
        },
        "getUser": function(userid) {
            for(id in this.list) {
                if(this.list[id].userid == userid)
                    return this.list[id];
            }
            return null;
        },
    };
}