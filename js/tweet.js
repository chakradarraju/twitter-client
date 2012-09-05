define(["dojo","js/twitterObject","js/util"], function(dojo, twitterObject, util) {
    return dojo.declare("Tweet", twitterObject, {
        hashes: null,
        tweetData: null,
        user: null,
        display: true,

        constructor: function(tweet, user) {
            this.tweetData = tweet;
            this.user = user;
        },

        createHTMLNode: function() {
            var node = document.createElement('div');
            node.className = "tweet active";
            node.appendChild(document.createTextNode(this.tweetInfo()));
            node.appendChild(document.createElement('br'));
            node.appendChild(this.getTweetTextNode());
            return node;
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
            //hashlist.showHash(this.hash);
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
            return "Tweet by: "+this.user.userid+" Tweeted at: "+this.tweetData.created_at.substr(0,19);
        },

        show: function() {
            this.display = true;
            this.node.className = "tweet active";
        },

        hide: function() {
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
    });
});