function AddUser() {
    var node = document.getElementById("addUserContainer");
    var inputElement = document.getElementById("addUser");
    var form = document.getElementById("addUserForm");
    form.addEventListener("submit",function() {
        userlist.addToList(new User(inputElement.value));
        inputElement.value = "";
    });
}