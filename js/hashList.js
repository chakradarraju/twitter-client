define(["dojo","js/twitterObject","js/tweetList","js/hash","js/util"], function(dojo, twitterObject, tweetList, Hash, util) {
    var hashList = new twitterObject();
    hashList.hashes = {};
    hashList.hashListElement = null;
    hashList.selectedHash = null;
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
        hashList.selectedHash = hash;
    };

    hashList.getTweets = function(hash) {
        return hashList.hashes[hash].getTweets();
    };

    hashList.registerHash(null);
    util.connect(tweetList,"addTweet",hashList,"registerTweet");
    util.pubsub.subscribe("hashChange",hashList.showHash,hashList);

    return hashList;
});