dojo.provide("js.Hash");

dojo.declare("js.Hash", [dijit._Widget, dijit._Templated], {
    widgetsInTemplate: true,
    templateString: dojo.cache("templates", "Hash.html"),

    constructor: function(hash) {
        this.hash = hash.hash;
        this.tweets = [];
        this.display = true;
        util.pubsub.subscribe("filtered",this.updateCounter,this);
    },

    postCreate: function() {
        this.linkElement.innerHTML = this.hash ? this.hash : "All";
        this.tweetCounter.innerHTML = this.tweets.length;
        util.initClickHandler(this.linkElement,this.hashClickHandler,{hash:this.hash});
    },

    hashClickHandler: function() {
        util.pubsub.publish("hashChange",this.hash);
    },

    registerTweet: function(tweet) {
        var hashes = tweet.getHashes();
        var found = false;
        for(var i=0;i<hashes.length;i++) {
            if(hashes[i] == this.hash)
                found = true;
        }
        if(!found && this.hash != null)
            return;
        this.tweets.push(tweet);
        this.updateCounter();
    },

    updateCounter: function() {
        var count = 0;
        for(var i=0;i<this.tweets.length;i++)
            if(this.tweets[i].display)
                count++;
        this.tweetCounter.innerHTML = count;
        if(count > 0 || this.hash == null)
            this.show();
        else
            this.hide();
    },

    show: function() {
        this.display = true;
        this.node.className = "hash active";
    },

    hide: function() {
        this.display = false;
        this.node.className = "hash";
    },

    getTweets: function() {
        return this.tweets;
    }
});