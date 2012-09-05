var ghashList = null;
require(["js/userList", "js/tweetList", "js/hashList", "js/userAddBox", "js/filter", "dojo/domReady!"], function(userList, tweetList, hashList, userAddBox, filter) {
    ghashList = hashList;
    filter.setup();
    document.getElementById("addUserContainer").appendChild(userAddBox.getHTMLNode());
    document.getElementById("userListContainer").appendChild(userList.getHTMLNode());
    document.getElementById("tweetListContainer").appendChild(tweetList.getHTMLNode());
    document.getElementById("hashContainer").appendChild(hashList.getHTMLNode());
});