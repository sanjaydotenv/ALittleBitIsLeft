let btns = document.querySelectorAll("button");
let screen = document.querySelector(".screen h1");

let num1 = "";
let num2 = "";
let operators = "";
btns.forEach((btn) => {
  btn.addEventListener("click", (btn) => {
    let btnValue = btn.target.innerText;

    if (btnValue === "=") {
      if (num1 === "" || num2 === "" || operators === "") return;

      let result;

      switch (operators) {
        case "+":
          result = Number(num1) + Number(num2);
          break;

        case "-":
          result = Number(num1) - Number(num2);
          break;

        case "*":
          result = Number(num1) * Number(num2);
          break;

        case "/":
          result = Number(num1) / Number(num2);
          break;
      }

      screen.textContent = result;
      return;
    }

    if (btnValue == "c") {
      num1 = "";
      num2 = "";
      operators = "";
      screen.textContent = "0";
      return;
    }

    if (
      btnValue === "+" ||
      btnValue === "-" ||
      btnValue === "*" ||
      btnValue === "/"
    ) {
      if (num1 === "" || operators !== "") return;

      operators = btnValue;
      screen.textContent = num1 + operators;
      return;
    }

    if (operators == "") {
      num1 += btnValue;
      screen.textContent = num1;
    } else {
      num2 += btnValue;
      screen.textContent = num1 + operators + num2;
    }
  });
});
