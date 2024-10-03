// Theme toggle functionality
const toggleThemeBtn = document.getElementById("toggle-theme");
const body = document.body;

toggleThemeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
});

// Task management functionality
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = [];

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    const li = document.createElement("li");
    li.classList.add(task.completed ? "task-completed" : "task-pending");
    li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleComplete(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
            </div>
        `;
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

function editTask(index) {
  const newTaskText = prompt("Edit task:", tasks[index].text);
  if (newTaskText !== null) {
    tasks[index].text = newTaskText;
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

document.getElementById("show-pending").addEventListener("click", () => {
  renderTasks("pending");
});

document.getElementById("show-completed").addEventListener("click", () => {
  renderTasks("completed");
});

// Render all tasks initially
renderTasks();
