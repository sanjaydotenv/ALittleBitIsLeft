const tasks = document.querySelectorAll(".task");
const progressFill = document.querySelector(".progress-fill");
const count = document.getElementById("count");

function saveData() {
  const data = [];

  tasks.forEach((task) => {
    const input = task.querySelector(".task-input");
    const checkbox = task.querySelector(".check");

    data.push({
      text: input.value,
      completed: checkbox.checked,
    });
  });

  localStorage.setItem("tasks", JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("tasks"));

  if (!data) return;

  tasks.forEach((task, index) => {
    const input = task.querySelector(".task-input");
    const checkbox = task.querySelector(".check");

    if (data[index]) {
      input.value = data[index].text;
      checkbox.checked = data[index].completed;

      checkbox.disabled = input.value.trim() === "";

      if (checkbox.checked) {
        input.style.textDecoration = "line-through";
        input.style.color = "#888";
      }
    }
  });

  updateProgress();
}

function updateProgress() {
  let completed = 0;

  tasks.forEach((task) => {
    const checkbox = task.querySelector(".check");

    if (checkbox.checked) completed++;
  });

  progressFill.style.width = `${(completed / 3) * 100}%`;

  count.innerText = `${completed}/3 Completed`;
}

tasks.forEach((task) => {
  const input = task.querySelector(".task-input");
  const checkbox = task.querySelector(".check");

  checkbox.disabled = true;

  input.addEventListener("input", () => {
    const empty = input.value.trim() === "";

    checkbox.disabled = empty;

    if (empty) {
      checkbox.checked = false;
      input.style.textDecoration = "none";
      input.style.color = "#000";
    }

    saveData();
    updateProgress();
  });

  checkbox.addEventListener("change", () => {
    if (input.value.trim() === "") {
      checkbox.checked = false;
      return;
    }

    if (checkbox.checked) {
      input.style.textDecoration = "line-through";
      input.style.color = "#888";
    } else {
      input.style.textDecoration = "none";
      input.style.color = "#000";
    }

    saveData();
    updateProgress();
  });
});

loadData();
updateProgress();
