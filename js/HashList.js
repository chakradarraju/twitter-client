dojo.provide("js.HashList");

dojo.require("js.Hash");

dojo.declare("js.HashList", [dijit._Widget, dijit._Templated], {
    widgetsInTemplate: true,
    templateString: dojo.cache("templates", "HashList.html"),

    constructor: function() {
        this.hashes = {};
    },

    postCreate: function() {
        this.registerHash(null);
        util.pubsub.subscribe("newTweetAdded",this.registerTweet,this);
        util.pubsub.subscribe("hashChange",this.showHash,this);
    },

    registerHash: function(hash) {
        this.hashes[hash] = new js.Hash({"hash":hash});
        this.hashes[hash].placeAt(this.node);
    },

    registerTweet: function(tweet) {
        var hashes = tweet.getHashes();
        this.registerTweetWithHashes(hashes,tweet);
    },

    registerTweetWithHashes: function(hashes,tweet) {
        this.hashes[null].registerTweet(tweet);
        for(var i=0;i<hashes.length;i++) {
            var hash = hashes[i];
            if(this.hashes[hash] == null)
                this.registerHash(hash);
            this.hashes[hash].registerTweet(tweet);
        }
    },

    showHash: function(hash) {
        if(hash == "All")
            hash = null;
        if(hash == null)
            this.selectedHashElement.innerHTML = "Choose a hashtag";
        else
            this.selectedHashElement.innerHTML = hash;
    },

    getTweets: function(hash) {
        return this.hashes[hash].getTweets();
    },

}
/*
function(dojo, twiclientBase, Hash, util) {
    var hashList = new twiclientBase();
    hashList.hashes = {};
    hashList.hashListElement = null;
    hashList.selectedHashElement = null;

    hashList.createHTMLNode = function() {
        var node = document.createElement('a');
        hashList.selectedHashElement = document.createElement('span');
        hashList.selectedHashElement.innerHTML = "Choose a hashtag";
        node.appendChild(hashList.selectedHashElement);
        hashList.hashListElement = document.createElement('ul');
        node.appendChild(hashList.hashListElement);
        return node;
    };

    hashList.getHTMLNode();

    hashList.registerHash = function(hash) {
        hashList.hashes[hash] = new Hash(hash);
        hashList.hashListElement.appendChild(hashList.hashes[hash].getHTMLNode());
    };

    hashList.registerTweet = function(tweet) {
        var hashes = tweet.getHashes();
        hashList.registerTweetWithHashes(hashes,tweet);
    };

    hashList.registerTweetWithHashes = function(hashes,tweet) {
        hashList.hashes[null].registerTweet(tweet);
        for(var i=0;i<hashes.length;i++) {
            var hash = hashes[i];
            if(hashList.hashes[hash] == null)
                hashList.registerHash(hash);
            hashList.hashes[hash].registerTweet(tweet);
        }
    };

    hashList.showHash = function(hash) {
        if(hash == "All")
            hash = null;
        if(hash == null)
            hashList.selectedHashElement.innerHTML = "Choose a hashtag";
        else
            hashList.selectedHashElement.innerHTML = hash;
    };

    hashList.getTweets = function(hash) {
        return hashList.hashes[hash].getTweets();
    };

    hashList.registerHash(null);

    return hashList;
}
*/
);