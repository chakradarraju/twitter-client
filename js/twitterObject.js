define(["dojo"], function(dojo) {
    return dojo.declare(null, {
        node: null,
        getHTMLNode: function() {
            return (this.node || (this.node = this.createHTMLNode()));
        },
        createHTMLNode: function() {
            return document.createElement('div');
        }
    });
});
