let entierGame = () => {
  let btn = document.querySelector("button");
  let box = document.querySelector(".box");
  let main = document.querySelector("main");
  let timer = document.querySelector(".time");
  let score = document.querySelector(".score");
  let overlay = document.querySelector(".overlay");
  let overlayh4 = document.querySelector(".overlay h4 span");
  let overlayBtn = document.querySelector(".overlay button");
  let endScore = document.querySelector(".endScore");
  let diffBtn = document.querySelectorAll(".difficulty button")

  let level = 1000
  let click = false;
  let interval;
  let secondInterval;
  let time = 0;
  let point = 0;
  let gameStart = false;

  diffBtn.forEach((btn) => {
    btn.addEventListener("click" , (event) => {
      if (event.target.classList.contains("easy")){
        level = 1200
      }
      else if (event.target.classList.contains("medium")){
        level = 800
      }
      else if (event.target.classList.contains("hard")){
       level = 300
      }
    })
  })


  let random = () => {
    let mainH = main.clientHeight - box.offsetHeight;
    let mainW = main.clientWidth - box.offsetWidth;

    let rY = Math.floor(Math.random() * mainH);
    let rX = Math.floor(Math.random() * mainW);

    let rColor = Math.floor(Math.random() * 255);
    let gColor = Math.floor(Math.random() * 255);
    let bColor = Math.floor(Math.random() * 255);

    box.style.top = `${rY}px`;
    box.style.left = `${rX}px`;
    box.style.backgroundColor = `rgb(${rColor},${gColor},${bColor})`;
    click = true;
  };

  box.addEventListener("click", () => {
    if (!gameStart || !click) return;
    click = false;
    point++;
    score.textContent = point;
  });

  btn.addEventListener("click", () => {
    clearInterval(interval);
    clearInterval(secondInterval);
    gameStart = true;

    interval = setInterval(() => {
      random();
      time++;
      timer.textContent = time;
    }, level);

    setTimeout(() => {
      clearInterval(interval);
      overlay.style.display = "flex";
      endScore.textContent = point;

      secondInterval = setTimeout(() => {
        overlay.style.display = "none";
        timer.textContent = "0";
        score.textContent = "0";
        time = 0;
        level = 1000
        point = 0;
        btn.style.display = "flex";
        box.style.top = `20%`;
        box.style.left = `40%`;
        box.style.backgroundColor = `rgb(${255},${255},${255})`;
      }, 10000);
    }, 10000);

    btn.style.display = "none";
  });

  overlayBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    timer.textContent = "0";
    score.textContent = "0";
    time = 0;
    point = 0;
    btn.style.display = "flex";
    box.style.top = `20%`;
    box.style.left = `40%`;
    level = 1000
    box.style.backgroundColor = `rgb(${255},${255},${255})`;
  });
};
entierGame()