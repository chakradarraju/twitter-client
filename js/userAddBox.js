define(["dojo","js/twitterObject","js/userList","js/util"], function(dojo,twitterObject,userList,util) {
    var userAddBox = new twitterObject();

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
        userList.addNewUser(userAddBox.inputElement.value);
        userAddBox.inputElement.value = "";
        e.preventDefault();
    };

    return userAddBox;
});