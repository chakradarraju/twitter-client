define(["dojo","js/twitterObject","js/util"], function(dojo, twitterObject, util) {
    return dojo.declare("Hash", twitterObject, {
        hash: null,
        tweets: null,
        tweetCounter: null,
        display: true,

        constructor: function(hash) {
            this.hash = hash;
            this.tweets = [];
            util.pubsub.subscribe("filtered",this.updateCounter,this);
        },

        createHTMLNode: function() {
            var node = document.createElement('li');
            var link = document.createElement('a');
            util.initClickHandler(link,this.hashClickHandler,{hash:this.hash});
            if(this.hash == null)
                link.innerHTML = "All";
            else
                link.innerHTML = this.hash;
            link.href = "javascript:void(0);";
            this.tweetCounter = document.createElement('span');
            this.tweetCounter.innerHTML = this.tweets.length;
            node.appendChild(link);
            node.appendChild(document.createTextNode(" ("));
            node.appendChild(this.tweetCounter);
            node.appendChild(document.createTextNode(")"));
            return node;
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
});