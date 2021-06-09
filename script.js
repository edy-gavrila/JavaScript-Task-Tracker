const showFormBtn = document.getElementById("show-form");
const addTaskForm = document.querySelector(".task-form");
const dateEl = document.getElementById("date");
const titleEl = document.getElementById("title");
const descEl = document.getElementById("description");
const reminderEl = document.getElementById("reminder");

//check for stored tasks in local storage and retrive them
const retreiveTasks = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    return storedTasks;
  } else {
    return [];
  }
};

//stored tasks in local storage
const storeTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

let tasks = retreiveTasks();

//returns the html for a given task object
const createTask = (task) => {
  const date = new Date(task.date);

  const html = `
  <div class="task-container" id="${task.id}">
    <div class="date ${task.reminder ? "reminder" : ""}">
      <span class="day">${
        date.getDate().toString().length < 2 ? "0" : ""
      }${date.getDate()}</span>
      <span class="month">${date.toLocaleString("default", {
        month: "long",
      })}</span>
      <span class="year">${date.getFullYear()}</span>
    </div>
    <div class="task" id="${task.id}" >
      <h3 id="${task.id}">${task.title}</h3>
      <small id="${task.id}">${task.description}</small>
    </div>
    <button class="delete" id="${
      task.id
    }"><i class="fas fa-2x fa-times"></i></button>
  </div>
  `;

  return html;
};

//update the DOM with the current tasks
const updateTasks = () => {
  const tasksContainer = document.querySelector(".tasks");

  if (tasks.length > 0) {
    tasksContainer.innerHTML = "";
  } else {
    tasksContainer.innerHTML =
      '<p style="text-align: center">There currently are no tasks</p>';
    return;
  }

  html = "";
  tasks.forEach((task) => {
    html += createTask(task);
  });
  tasksContainer.innerHTML = html;

  //assign event listeners for deleteing a task
  deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const updatedTasks = tasks.filter((task) => task.id !== btn.id);
      tasks = updatedTasks;
      storeTasks(tasks);
      updateTasks();
    });
  });

  //assign event listeners for doubleclicking a task
  taskEls = document.querySelectorAll(".task-container");
  taskEls.forEach((taskEl) => {
    taskEl.addEventListener("dblclick", (e) => {
      createModal(e.target.id);
    });
  });
};

//create the html for when a task is clicked
function createModal(taskId) {
  const backdropEl = document.getElementById("modal");
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex < 0) {
    return;
  }

  backdropEl.innerHTML = `   
   <div class="modal">
    <label for="date">Date</label>
    <input type="date" id="modal-date" class="date" value = "${tasks[taskIndex].date}"/>
    <label for="title">Task Title</label>
    <input type="text" id="modal-title" value="${tasks[taskIndex].title}"/>
    <label for="description">Task Description</label>
    <textarea name="" id="modal-desc" cols="30" rows="5">${tasks[taskIndex].description}</textarea>
    <div>
      <label for="reminder">Set Remainder</label>
      <input type="checkbox" id="modal-reminder" ${tasks[taskIndex].reminder ? "checked" : ""} />
    </div>
    <button id="updateBtn">Update Task</button>
  </div>
    `;
  const updateBtn = document.getElementById("updateBtn");

  updateBtn.addEventListener("click", () => {
    const dateEl = document.getElementById("modal-date");
    const titleEl = document.getElementById("modal-title");
    const descEl = document.getElementById("modal-desc");
    const reminderEl = document.getElementById("modal-reminder");
    
    const updatedTask = newTask(dateEl, titleEl, descEl, reminderEl);
    
    if(updatedTask){
    tasks[taskIndex] = updatedTask;
    storeTasks(tasks);
    updateTasks();
    backdropEl.classList.add("hidden");
    }

    
  });

  backdropEl.classList.remove("hidden");

  backdropEl.addEventListener("click", (e) => {
    if (e.target.id === "modal") {
      backdropEl.classList.add("hidden");
    }
  });
}

updateTasks();

//add a new task
addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = newTask(dateEl, titleEl, descEl, reminderEl);
  if (task) {
    tasks.push(task);
    storeTasks(tasks);
    updateTasks();
  }
});

//adds a new task
function newTask(dateEl, titleEl, descEl, reminderEl) {
  const date = new Date(dateEl.value);
  if (
    !(
      Object.prototype.toString.call(date) === "[object Date]" &&
      !Number.isNaN(date.getTime())
    )
  ) {
    dateEl.classList.add("invalid");
    return;
  }

  if (titleEl.value.trim().length === 0) {
    titleEl.classList.add("invalid");
    return;
  }

  if (descEl.value.trim().length === 0) {
    descEl.classList.add("invalid");
    return;
  }
  //if all date is valid create a new task object
  const newTask = {
    id: Math.random().toString().substr(2),
    date: dateEl.value,
    title: titleEl.value,
    description: descEl.value,
    reminder: reminderEl.checked ? true : false,
  };
  dateEl.value = "";
  titleEl.value = "";
  descEl.value = "";
  reminderEl.checked = false;

  return newTask;
}

//remove invalid class on input
dateEl.addEventListener("input", (e) => e.target.classList.remove("invalid"));
titleEl.addEventListener("input", (e) => e.target.classList.remove("invalid"));
descEl.addEventListener("input", (e) => e.target.classList.remove("invalid"));

//deal with showing and hiding the form
showFormBtn.addEventListener("click", () => {
  const inputSection = document.querySelector(".task-input");
  const tasksSection = document.querySelector(".tasks");

  inputSection.classList.toggle("hidden");

  if (inputSection.classList.contains("hidden")) {
    showFormBtn.innerHTML = "Show Form";
    tasksSection.style.margin = "80px auto 40px auto";
  } else {
    showFormBtn.innerHTML = "Hide Form";
    tasksSection.style.margin = "0px auto 40px auto";
  }
});
