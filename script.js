tweetlist = null;
hashlist = null;
userlist = null;
addUser = null;
window.onload = function() {
    userlist = new Userlist();
    tweetlist = new Tweetlist();
    hashlist = new Hashlist();
    addUser = new AddUser();
    filter = new Filter();
    document.getElementById("userListContainer").appendChild(userlist.getHTMLNode());
    document.getElementById("tweetListContainer").appendChild(tweetlist.getHTMLNode());
    document.getElementById("addUserContainer").appendChild(addUser.getHTMLNode());
    document.getElementById("hashContainer").appendChild(hashlist.getHTMLNode());
}