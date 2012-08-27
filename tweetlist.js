function Tweetlist() {
    return {
        "list": [],
        "addTweet": function(tweet) {
            this.list.push(tweet);
            document.getElementById("tweetList").innerHTML += tweet.getHTML();
        },
        "refreshList": function() {
            document.getElementById("tweetList").innerHTML = "";
            for(id in this.list) {
                var tweet = this.list[id];
                if(tweet.user.display) {
                    document.getElementById("tweetList").innerHTML += tweet.getHTML();
                }
            }
        }
    };
}