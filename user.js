function User(user) {

    return {
        "userid": user['userid'],
        "display": true,
        "tweets": [],
        "getHTML": function() {
            return "<input type=checkbox id='checkbox_"+this.userid+"' class='userCheckbox' checked=checked /> "+this.userid;
        },
        "addUserEventHandlers": function() {
            var userCheckbox = document.getElementById("checkbox_"+this.userid);
            userCheckbox.onclick = this.onclick;
        },
        "onclick": function() {
            console.log(this);
            var clickedUser = this.id.substr(9);
            userlist.getUser(clickedUser).display = this.checked;
            tweetlist.refreshList();
        },
        "fetchTweets": function() {
            MyAjax.get("broker.php?username="+this.userid,{},this.receiveTweets,this);
        },
        "receiveTweets": function(data) {
            var tweets = JSON.parse(data);
            for(id in tweets) {
                var tweetObj = new Tweet(tweets[id],this);
                this.tweets.push(tweetObj);
                tweetlist.addTweet(tweetObj);
            }
        }
    };
}