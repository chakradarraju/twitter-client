function SearchBox() {
    this.node = this.getHTMLNode();
}

SearchBox.prototype.getHTMLNode = function() {
    if(this.node != null)
        return this.node;
    this.node = this.createHTMLNode();
    return this.node;
}

SearchBox.prototype.createHTMLNode = function() {
    var node = document.createElement('form');
    node.appendChild(document.createTextNode("Enter userid: "));
    var inputElement = document.createElement('input');
    node.appendChild(inputElement);
    node.addEventListener("submit",function(e) {
        twitter.userlist.newUser(inputElement.value);
        inputElement.value = "";
        e.preventDefault();
    });
    return node;
}