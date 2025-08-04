function signup() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const users = loadData("users") || [];
    if (username && password && !users.find(u => u.username === username)) {
        users.push({ username, password });
        saveData("users", users);
        document.getElementById("newUsername").value = "";
        document.getElementById("newPassword").value = "";
        showAlert("Account created! Please login.");
        window.location.href = "login.html";
    } else {
        showAlert("Username already exists or fields are empty!");
    }
}