twitter = {};
window.onload = function() {
    twitter.userlist = new Userlist();
    twitter.tweetlist = new Tweetlist();
    twitter.hashlist = new Hashlist();
    var searchBox = new SearchBox();
    twitter.filter = new Filter();
    document.getElementById("userListContainer").appendChild(twitter.userlist.getHTMLNode());
    document.getElementById("tweetListContainer").appendChild(twitter.tweetlist.getHTMLNode());
    document.getElementById("addUserContainer").appendChild(searchBox.getHTMLNode());
    document.getElementById("hashContainer").appendChild(twitter.hashlist.getHTMLNode());
}