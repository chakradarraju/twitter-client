var userlist = new Userlist();
var tweetlist = new Tweetlist();
document.getElementById("addUser").onkeyup = function(e) {
    if(e.which==13) {
        userlist.addToList(new User({"userid":this.value}));
        this.value = "";
    }
};