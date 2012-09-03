function SearchBox() {
    this.node = this.getHTMLNode();
}

SearchBox.prototype.getHTMLNode = function() {
    return (this.node || this.createHTMLNode());
};

SearchBox.prototype.createHTMLNode = function() {
    var node = document.createElement('form');
    node.appendChild(document.createTextNode("Enter userid: "));
    var inputElement = document.createElement('input');
    this.initSubmitHandler(node,inputElement);
    node.appendChild(inputElement);
    this.node = node;
    return node;
};

SearchBox.prototype.initSubmitHandler = function(domelement,inputElement) {
    domelement.addEventListener("submit",function(e) {
        twitter.userlist.addNewUser(inputElement.value);
        inputElement.value = "";
        e.preventDefault();
    });
};