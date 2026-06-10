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
  button.textContent = "Processing";
  button.classList.add("buttons");
  let taskDescription = document.createElement("div");
  taskDescription.classList.add("taskDescription");
  let p = document.createElement("p");
  p.textContent = task.description;

  div.appendChild(h1);
  div.appendChild(button);
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
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  RenderTask(task);

  form.reset();
});

allTasks.addEventListener("click", function (e) {
  if (e.target.classList.contains("buttons")) {
    e.target.style.backgroundColor = "green";
    e.target.textContent = "Completed";
    e.target.style.color = "white";
    return;
  }

  let task = e.target.closest(".taskdiv");

  if (!task) return;

  let description = task.querySelector(".taskDescription");
  console.log(description);

  if (description.style.display === "flex") {
    description.style.display = "none";
  } else {
    description.style.display = "flex";
  }
});
