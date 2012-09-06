require(["js/userList", "js/tweetList", "js/hashList", "js/userAddBox", "js/filter", "js/controller", "dojo/domReady!"],
    function(userList, tweetList, hashList, userAddBox, filter, controller) {
        document.getElementById("addUserContainer").appendChild(userAddBox.getHTMLNode());
        document.getElementById("userListContainer").appendChild(userList.getHTMLNode());
        document.getElementById("tweetListContainer").appendChild(tweetList.getHTMLNode());
        document.getElementById("hashContainer").appendChild(hashList.getHTMLNode());
    });