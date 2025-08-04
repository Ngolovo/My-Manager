document.addEventListener("DOMContentLoaded", () => {
    const currentUser = loadData("currentUser");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const loginLogout = document.getElementById("loginLogout");

    // Show welcome message and set login/logout link
    if (currentUser && currentUser.loggedIn) {
        welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
        loginLogout.innerHTML = `<a href="#" class="hover:text-yellow-300" id="logoutLink">Logout</a>`;
    } else {
        welcomeMessage.textContent = "Welcome, Guest!";
        loginLogout.innerHTML = `<a href="login.html" class="hover:text-yellow-300">Login</a>`;
    }

    // Display only today's tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const today = new Date().toISOString().split("T")[0];
    const reminderList = document.getElementById("reminderList");
    reminderList.innerHTML = "";

    const todaysTasks = tasks.filter(task => task.date === today);

    if (todaysTasks.length === 0) {
        reminderList.innerHTML = "<li>No tasks for today.</li>";
    } else {
        todaysTasks.forEach((task) => {
            const li = document.createElement("li");
            li.classList.add("flex", "items-center", "gap-3");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("form-checkbox", "h-5", "w-5", "text-blue-600", "cursor-pointer");
            checkbox.checked = task.completed || false;

            const label = document.createElement("label");
            label.textContent = `${task.text} - ${new Date(task.date).toLocaleDateString()}`;
            label.classList.add("cursor-pointer", "transition-all", "duration-300");
            if (task.completed) {
                label.classList.add("line-through", "text-red-500");
            }

            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;

                if (task.completed) {
                    label.classList.add("line-through", "text-red-500");
                } else {
                    label.classList.remove("line-through", "text-red-500");
                }

                // Save updated task state to localStorage
                const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
                const taskIndex = allTasks.findIndex(t =>
                    t.text === task.text && t.date === task.date
                );
                if (taskIndex > -1) {
                    allTasks[taskIndex].completed = task.completed;
                    localStorage.setItem("tasks", JSON.stringify(allTasks));
                }
            });

            li.appendChild(checkbox);
            li.appendChild(label);
            reminderList.appendChild(li);
        });
    }

    // Attach logout event listener
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Logout function
    function logout() {
        if (currentUser) {
            currentUser.loggedIn = false;
            saveData("currentUser", currentUser);
        }
        window.location.href = "login.html";
    }
});
