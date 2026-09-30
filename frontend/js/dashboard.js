const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector(".task-list");


/* Add Task */

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = document.createElement("div");

    task.classList.add("task");

    task.innerHTML = `
        <p>${taskText}</p>
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(task);

    taskInput.value = "";

});


/* Complete and Delete */

taskList.addEventListener("click", function(event) {

    const task = event.target.closest(".task");

    if (!task) {
        return;
    }

    if (event.target.classList.contains("complete-btn")) {

        task.classList.toggle("completed");

    }

    if (event.target.classList.contains("delete-btn")) {

        task.remove();

    }

});