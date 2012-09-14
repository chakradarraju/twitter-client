dojo.provide("js.Tweet");

dojo.declare("js.Tweet", [dijit._Widget, dijit._Templated], {
    widgetsInTemplate: true,
    templateString: dojo.cache("templates", "Tweet.html"),

    constructor: function(tweet) {
        this.tweetData = tweet.tweetData;
        this.display = true;
        this.hashes = null;
    },

    postCreate: function() {
        this.tweetInfoDOM.innerHTML = this.tweetInfo();
        this.tweetTextDOM.appendChild(this.getTweetTextNode());
    },

    getTweetTextNode: function() {
        var words = this.tweetData.text.split(" ");
        var node = document.createElement('span');
        for(var i=0;i<words.length;i++) {
            var word = words[i];
            if(word.indexOf("#") == 0) {
                var link = document.createElement('a');
                util.initClickHandler(link,this.hashClickHandler,{hash:word});
                link.innerHTML = word;
                link.href = "javascript:void(0);"
                node.appendChild(link);
                node.appendChild(document.createTextNode(" "));
            } else
                node.appendChild(document.createTextNode(word+" "));
        }
        return node;
    },

    hashClickHandler: function() {
        util.pubsub.publish("hashChange",this.hash);
    },

    getHashes: function() {
        if(this.hashes != null)
            return this.hashes;
        var words = this.tweetData.text.split(" ");
        var hashes = [];
        for(var i=0;i<words.length;i++) {
            var word = words[i];
            if(word.indexOf("#") == 0)
                hashes.push(word);
        }
        return hashes;
    },

    isTweetOlder: function(tweet) {
        return tweet.createdAt() < this.createdAt();
    },

    tweetInfo: function() {
        return "Tweet by: "+this.getUserId()+" Tweeted at: "+this.tweetData.created_at.substr(0,19);
    },

    show: function() {
        if(this.display)
            return;
        this.display = true;
        this.node.className = "tweet active";
    },

    hide: function() {
        if(!this.display)
            return;
        this.display = false;
        this.node.className = "tweet";
    },

    containsHash: function(hash) {
        if(hash.indexOf("#") != 0)
            return false;
        var hashes = this.getHashes();
        for(var i=0;i<hashes.length;i++) {
            if(hashes[i] == hash)
                return true;
        }
        return false;
    },

    createdAt: function() {
        return new Date(this.tweetData.created_at);
    },

    getUserId: function() {
        return this.tweetData.user.screen_name;
    },
});