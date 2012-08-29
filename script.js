var tweetlist = null;
var userlist = null;
window.onload = function() {
    userlist = new Userlist();
    tweetlist = new Tweetlist();
    addUser = new AddUser(userlist);
}