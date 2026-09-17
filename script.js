const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    const tasks = [];
    const items = taskList.querySelectorAll("li");

    items.forEach(function(li) {
        const span = li.querySelector("span");
        tasks.push({
            text: span.textContent,
            completed: span.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText, isCompleted) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    if (isCompleted) {
        span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    span.addEventListener("click", function() {
        span.classList.toggle("completed");
        saveTasks();
        updateCounter();
    });

    deleteBtn.addEventListener("click", function() {
        li.remove();
        saveTasks();
        updateCounter();
    });
}

function addTask() {
    const taskText = taskInput.value;

    if (taskText === "") {
        return;
    }

    createTaskElement(taskText, false);
    saveTasks();
    updateCounter();

    taskInput.value = "";
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(function(task) {
            createTaskElement(task.text, task.completed);
        });
    }
}
const counterDisplay = document.getElementById("counterDisplay");
const updateCounter = () => {
    const activeTasks = taskList.querySelectorAll("li span:not(.completed)");
    counterDisplay.textContent = activeTasks.length + " tasks left";
};
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

loadTasks();
updateCounter();
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        filterBtns.forEach(function(b) {
            b.classList.remove("active");
        });
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        const allTasks = taskList.querySelectorAll("li");

        allTasks.forEach(function(li) {
            const isCompleted = li.querySelector("span").classList.contains("completed");

            if (filter === "all") {
                li.style.display = "flex";
            } else if (filter === "active" && !isCompleted) {
                li.style.display = "flex";
            } else if (filter === "completed" && isCompleted) {
                li.style.display = "flex";
            } else {
                li.style.display = "none";
            }
        });
    });
});