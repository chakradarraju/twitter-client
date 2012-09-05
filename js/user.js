define(["dojo","js/twitterObject","js/util"], function(dojo, twitterObject, util) {
    return dojo.declare("User", twitterObject,{
        display: true,
        checkbox: null,
        tweets: null,
        userid: null,

        createHTMLNode: function() {
            var node = document.createElement('li');
            var checkbox = document.createElement('input');
            util.initClickHandler(checkbox,this.checkboxClick,this);
            checkbox.type = "checkbox";
            checkbox.checked = true;
            node.className = " active";
            node.appendChild(checkbox);
            node.appendChild(document.createTextNode(this.userid));
            node.appendChild(document.createTextNode(" (Fetching tweets...)"));
            this.checkbox = checkbox;
            return node;
        },

        constructor: function(userid) {
            this.userid = userid;
            this.tweets = [];
        },

        checkboxClick: function() {
            this[this.checkbox.checked ? "show" : "hide"]();
        },

        show: function() {
            this.display = true;
            this.node.className = "active";
            util.pubsub.publish("showingUser",this);
        },

        hide: function() {
            this.display = false;
            this.node.className = "";
            util.pubsub.publish("hidingUser",this);
        },

        fetchTweets: function() {
            util.ajaxGet("broker.php?username="+this.userid,{},this.receiveTweets,this);
        },

        receiveTweets: function(data) {
            util.pubsub.publish("newTweetsReceived",JSON.parse(data));
            this.node.removeChild(this.node.lastChild); // Removing (Fetching tweets...)
        },

        putTweet: function(tweet) {
            this.tweets.push(tweet);
        },

        getTweets: function() {
            return this.tweets;
        }
    });
});