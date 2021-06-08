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
    return null;
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
  <div class="task-container ">
    <div class="date ${task.reminder ? "reminder" : ""}">
      <span class="day">${
        date.getDate().toString().length < 2 ? "0" : ""
      }${date.getDate()}</span>
      <span class="month">${date.toLocaleString("default", {
        month: "long",
      })}</span>
      <span class="year">${date.getFullYear()}</span>
    </div>
    <div class="task">
      <h3>${task.title}</h3>
      <small>${task.description}</small>
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
      console.log(btn.id);
      const updatedTasks = tasks.filter((task) => task.id !== btn.id);
      tasks = updatedTasks;
      storeTasks(tasks);
      updateTasks();
    });
  });
};

updateTasks();

//add a new task
addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
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
  //if all date is valid careate a new task object
  const newTask = {
    id: Math.random().toString().substr(2),
    date: dateEl.value,
    title: titleEl.value,
    description: descEl.value,
    reminder: reminderEl.checked ? true : false,
  };

  tasks.push(newTask);
  storeTasks(tasks);
  updateTasks();
  dateEl.value = "";
  titleEl.value = "";
  descEl.value = "";
  reminderEl.checked = false;
});

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
