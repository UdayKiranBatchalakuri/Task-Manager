const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector(".task-list");


// Save tasks to localStorage

function saveTasks(tasks) {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Get tasks from localStorage

function getTasks() {

    const tasks = localStorage.getItem("tasks");

    if (tasks === null) {
        return [];
    }

    return JSON.parse(tasks);

}


// Render tasks

function renderTasks() {

    const tasks = getTasks();

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const taskElement = document.createElement("div");

        taskElement.classList.add("task");

        // Store the task id in the HTML element
        taskElement.dataset.id = task.id;

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <p>${task.text}</p>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        taskList.appendChild(taskElement);

    });

}


// Add Task

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const tasks = getTasks();

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks(tasks);

    renderTasks();

    taskInput.value = "";

});


// Complete, Edit and Delete

taskList.addEventListener("click", function(event) {

    const taskElement = event.target.closest(".task");

    if (!taskElement) {
        return;
    }

    // Get the task id from the HTML element
    const taskId = Number(taskElement.dataset.id);

    const tasks = getTasks();


    // Complete task

    if (event.target.classList.contains("complete-btn")) {

        const task = tasks.find(function(task) {

            return task.id === taskId;

        });

        if (task) {

            task.completed = !task.completed;

            saveTasks(tasks);

            renderTasks();

        }

    }


    // Edit task

    if (event.target.classList.contains("edit-btn")) {

        const task = tasks.find(function(task) {

            return task.id === taskId;

        });

        if (task) {

            const updatedText = prompt(
                "Edit your task:",
                task.text
            );

            // User clicked Cancel
            if (updatedText === null) {
                return;
            }

            const trimmedText = updatedText.trim();

            // Don't allow empty task
            if (trimmedText === "") {
                return;
            }

            // Update task
            task.text = trimmedText;

            // Save updated task
            saveTasks(tasks);

            // Display updated task
            renderTasks();

        }

    }


    // Delete task

    if (event.target.classList.contains("delete-btn")) {

        const updatedTasks = tasks.filter(function(task) {

            return task.id !== taskId;

        });

        saveTasks(updatedTasks);

        renderTasks();

    }

});


// Load tasks when dashboard opens

renderTasks();