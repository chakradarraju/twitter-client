function Tweet(tweet,user) {
    return {
        "tweet": tweet,
        "user": user,
        "getId": function() {
            return "tweet_"+this.user.userid+"_"+this.tweet.id_str;
        },
        "getHTML": function() {
            return "<div id='"+this.getId()+"' class='tweet'>"+this.tweet.text+"</div>";
        },
    };
}