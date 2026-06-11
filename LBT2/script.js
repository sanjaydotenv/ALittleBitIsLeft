let form = document.querySelector("form");
let titleInp = document.querySelector(".titleinp");
let areaInp = document.querySelector(".textareainp");
let allTasks = document.querySelector(".alltasks");
let taskDescription = document.querySelector(".taskDescription");

function RenderTask(task) {
  let taskdiv = document.createElement("div");
  taskdiv.classList.add("taskdiv");
  let div = document.createElement("div");
  let h1 = document.createElement("h1");
  h1.textContent = task.title;
  let button = document.createElement("button");
  if (task.complete) {
    button.textContent = "Completed";
    button.style.backgroundColor = "green";
    button.style.color = "white";
  } else {
    button.textContent = "Processing";
  }
  button.classList.add("buttons");
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");
  let taskDescription = document.createElement("div");
  taskDescription.classList.add("taskDescription");
  let p = document.createElement("p");
  p.textContent = task.description;

  div.appendChild(h1);
  div.appendChild(button);
  div.appendChild(h1);
  div.appendChild(button);
  div.appendChild(deleteBtn);
  taskDescription.appendChild(p);
  taskdiv.appendChild(div);
  taskdiv.appendChild(taskDescription);
  allTasks.appendChild(taskdiv);
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => {
  RenderTask(task);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (titleInp.value.trim("") === "") {
    alert("Please Enter a Title 🤞");
    return;
  }

  let task = {
    title: titleInp.value,
    description: areaInp.value,
    complete: false,
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  RenderTask(task);

  form.reset();
});

allTasks.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteBtn")) {
    let taskDiv = e.target.closest(".taskdiv");

    let title = taskDiv.querySelector("h1").textContent;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter((task) => task.title !== title);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskDiv.remove();

    return;
  }
  if (e.target.classList.contains("buttons")) {
    let taskDiv = e.target.closest(".taskdiv");

    let title = taskDiv.querySelector("h1").textContent;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
      if (task.title === title) {
        task.complete = true;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    e.target.textContent = "Completed";
    e.target.style.backgroundColor = "green";
    e.target.style.color = "white";

    return;
  }

  let task = e.target.closest(".taskdiv");

  if (!task) return;

  let description = task.querySelector(".taskDescription");

  if (description.style.display === "flex") {
    description.style.display = "none";
  } else {
    description.style.display = "flex";
  }
});
