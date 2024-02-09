document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.querySelector(".add-button");
  const taskInput = document.querySelector(".task-name");
  const tasksContainer = document.querySelector(".tasks");

  loadTasksFromLocalStorage();

  addBtn.addEventListener("click", addTask);

  function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName !== "") {
      const newTask = createTaskElement(taskName);
      tasksContainer.appendChild(newTask);

      saveTaskToLocalStorage(taskName, false);

      taskInput.value = "";
      updateTaskSectionBorder();
    }
  }

  function deleteTask(event) {
    const taskDiv = event.target.closest(".task");
    const taskName = taskDiv.querySelector(".left").textContent;

    removeTaskFromLocalStorage(taskName);

    taskDiv.remove();
    updateTaskSectionBorder();
  }

  function updateTaskSectionBorder() {
    const taskDivs = document.querySelectorAll(".task");
    const tasksContainer = document.querySelector(".tasks");
    const borderDiv = document.querySelector(".border");

    borderDiv.style.display = taskDivs.length > 0 ? "block" : "none";
    tasksContainer.classList.toggle("no-border", taskDivs.length === 0);
  }

  function createTaskElement(taskName, isDone) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const leftDiv = document.createElement("div");
    leftDiv.className = "left";
    leftDiv.textContent = taskName;

    const rightDiv = document.createElement("div");
    rightDiv.className = "right";

    const doneBtn = document.createElement("button");
    doneBtn.className = "done";
    doneBtn.innerHTML = '<img src="assets/images/check-mark.png" alt="" />';
    doneBtn.addEventListener("click", markAsDone);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "del";
    deleteBtn.innerHTML = '<img src="assets/images/cancel.png" alt="" />';
    deleteBtn.addEventListener("click", deleteTask);

    rightDiv.appendChild(doneBtn);
    rightDiv.appendChild(deleteBtn);

    taskDiv.appendChild(leftDiv);
    taskDiv.appendChild(rightDiv);

    if (isDone) {
      taskDiv.classList.add("done-task");
      doneBtn.style.display = "none";
      taskDiv.style.backgroundColor = "rgba(0, 128, 0, 0.171)";
    }

    return taskDiv;
  }

  function markAsDone(event) {
    const taskDiv = event.target.closest(".task");
    taskDiv.classList.toggle("done-task");

    const doneBtn = taskDiv.querySelector(".done");
    doneBtn.style.display = "none";

    const taskName = taskDiv.querySelector(".left").textContent;

    saveTaskToLocalStorage(taskName, taskDiv.classList.contains("done-task"));

    if (taskDiv.classList.contains("done-task")) {
      taskDiv.style.backgroundColor = "rgba(0, 128, 0, 0.171)";
    } else {
      taskDiv.style.backgroundColor = "";
      doneBtn.style.display = "inline-block";
    }
  }

  function loadTasksFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const taskName = localStorage.key(i);
      const isDone = JSON.parse(localStorage.getItem(taskName));
      const newTask = createTaskElement(taskName, isDone);
      tasksContainer.appendChild(newTask);
    }
    updateTaskSectionBorder();
  }

  function saveTaskToLocalStorage(taskName, isDone) {
    localStorage.setItem(taskName, JSON.stringify(isDone));
  }

  function removeTaskFromLocalStorage(taskName) {
    localStorage.removeItem(taskName);
  }
});
