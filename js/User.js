define(["dojo","js/twiclientBase","js/util"], function(dojo, twiclientBase, util) {
    return dojo.declare(twiclientBase,{

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
            this.display = true;
            this.checkbox = null;
            this.userid = userid;
        },

        checkboxClick: function() {
            this[this.checkbox.checked ? "show" : "hide"]();
        },

        show: function() {
            this.display = true;
            this.node.className = "active";
            util.pubsub.publish("showingUser",this.userid);
        },

        hide: function() {
            this.display = false;
            this.node.className = "";
            util.pubsub.publish("hidingUser",this.userid);
        },

        fetchTweets: function() {
            util.ajaxGet("broker.php?username="+this.userid,{},this.receiveTweets,this);
        },

        receiveTweets: function(data) {
            util.pubsub.publish("newTweetsReceived",JSON.parse(data));
            this.node.removeChild(this.node.lastChild); // Removing (Fetching tweets...)
        },
    });
});