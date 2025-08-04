// scripts/login.js - Login functionality with redirection to homepage

function login() {
    // Get input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate inputs
    if (!username || !password) {
        showAlert("Please fill in both username and password!");
        return;
    }

    // Load users from localStorage
    const users = loadData("users") || [];
    const user = users.find(u => u.username === username && u.password === password);

    // Check if user exists and credentials match
    if (user) {
        // Simulate session by storing logged-in user
        saveData("currentUser", { username, loggedIn: true });
        showAlert("Login successful! Redirecting to homepage...");
        // Redirect to homepage after a short delay for user feedback
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        showAlert("Invalid username or password!");
    }
}

// Optional: Check if already logged in on page load
document.addEventListener("DOMContentLoaded", () => {
    const currentUser = loadData("currentUser");
    if (currentUser && currentUser.loggedIn) {
        showAlert("You are already logged in!");
        window.location.href = "index.html";
    }
});