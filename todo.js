
 
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    window.onload = () => {
      tasks.forEach(task => displayTask(task.text, task.date));
    };

    function addTask() {
      const input = document.getElementById("todoInput");
      const dateInput = document.getElementById("todoDate");
      const taskText = input.value.trim();
      const taskDate = dateInput.value;
      const today = new Date().toISOString().split("T")[0];

      if (taskText && taskDate) {
        const task = { text: taskText, date: taskDate };
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTask(task.text, task.date);
        input.value = "";
        dateInput.value = "";
      }
    }

    function displayTask(text, date) {
      const list = document.getElementById("todoList");
      const li = createTaskElement(text, date);
      
      list.appendChild(li);

      const today = new Date().toISOString().split("T")[0];
      if (date === today) {
        const reminderList = document.getElementById("reminderList");
        const reminderLi = createTaskElement(text, date);
        reminderLi.classList.add("today");
        reminderList.appendChild(reminderLi);
      }
    }

    function createTaskElement(text, date) {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.onchange = function () {
        taskSpan.classList.toggle("strikethrough", checkbox.checked);
      };

      const taskSpan = document.createElement("span");
      taskSpan.innerText = `${text} - ${new Date(date).toLocaleDateString()}`;
      taskSpan.className = "task-text";

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.onclick = function () {
        li.remove();
        removeTaskFromStorage(text, date);
      };

      li.appendChild(checkbox);
      li.appendChild(taskSpan);
      li.appendChild(deleteBtn);

      return li;
    }

    function removeTaskFromStorage(text, date) {
      tasks = tasks.filter(task => !(task.text === text && task.date === date));
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }