define(["dojo","js/twiclientBase","js/util"], function(dojo, twiclientBase, util) {
    var userAddBox = new twiclientBase();

    userAddBox.inputElement = null;

    userAddBox.createHTMLNode = function() {
        var node = document.createElement('form');
        node.appendChild(document.createTextNode("Enter userid: "));
        userAddBox.inputElement = document.createElement('input');
        util.initSubmitHandler(node,userAddBox.submitHandler,userAddBox);
        node.appendChild(userAddBox.inputElement);
        return node;
    };

    userAddBox.submitHandler = function(e) {
        util.pubsub.publish("addingNewUser",userAddBox.inputElement.value);
        userAddBox.inputElement.value = "";
        e.preventDefault();
    };

    return userAddBox;
});