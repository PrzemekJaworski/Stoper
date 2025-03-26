// Selecting elements
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const historyBtn = document.querySelector(".history");
const stopwatch = document.querySelector(".stopwatch");
const time = document.querySelector(".time");
const timeList = document.querySelector(".time-list");

const infoBtn = document.querySelector(".fa-question");
const modalShadow = document.querySelector(".modal-shadow");
const closeModalBtn = document.querySelector(".close");

let countTime;
let minutes = 0;
let seconds = 0;
let timesArr = [];

// ⏱️ Start Stopwatch
const handleStart = () => {
  clearInterval(countTime);
  countTime = setInterval(() => {
    if (seconds < 9) {
      seconds++;
      stopwatch.textContent = `${minutes}:0${seconds}`;
    } else if (seconds >= 9 && seconds < 59) {
      seconds++;
      stopwatch.textContent = `${minutes}:${seconds}`;
    } else {
      minutes++;
      seconds = 0;
      stopwatch.textContent = `${minutes}:00`;
    }
  }, 100);
};

// ⏱️ Stop Stopwatch and Save Time
const handleStop = () => {
  time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`;
  if (stopwatch.textContent !== "0:00") {
    time.style.visibility = "visible";
    timesArr.push(stopwatch.textContent);
  }
  clearStuff();
};

// ⏸️ Pause Stopwatch
const handlePause = () => {
  clearInterval(countTime);
};

// 🔄 Reset Stopwatch & Clear History
const handleReset = () => {
  time.style.visibility = "hidden";
  timesArr = [];
  clearStuff();
};

// 🔄 Clear Stopwatch Display
const clearStuff = () => {
  clearInterval(countTime);
  stopwatch.textContent = "0:00";
  timeList.textContent = "";
  seconds = 0;
  minutes = 0;
};

// 📜 Show History of Times
const showHistory = () => {
  timeList.textContent = "";
  let num = 1;
  timesArr.forEach(time => {
    const newTime = document.createElement("li");
    newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`;
    timeList.appendChild(newTime);
    num++;
  });
};

// ℹ️ Show & Hide Modal Window
const showModal = () => {
  modalShadow.style.display =
    modalShadow.style.display === "block" ? "none" : "block";
  modalShadow.classList.toggle("modal-animation");
};

// ⏱️ Event Listeners
startBtn.addEventListener("click", handleStart);
pauseBtn.addEventListener("click", handlePause);
stopBtn.addEventListener("click", handleStop);
resetBtn.addEventListener("click", handleReset);
historyBtn.addEventListener("click", showHistory);
infoBtn.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", showModal);
window.addEventListener("click", e =>
  e.target === modalShadow ? showModal() : false
);
