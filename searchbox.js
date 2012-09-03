function SearchBox() {
    this.node = this.getHTMLNode();
}

SearchBox.prototype.getHTMLNode = function() {
    return (this.node || this.createHTMLNode());
}

SearchBox.prototype.createHTMLNode = function() {
    var node = document.createElement('form');
    node.appendChild(document.createTextNode("Enter userid: "));
    var inputElement = document.createElement('input');
    node.appendChild(inputElement);
    node.addEventListener("submit",function(e) {
        twitter.userlist.addNewUser(inputElement.value);
        inputElement.value = "";
        e.preventDefault();
    });
    this.node = node;
    return node;
}