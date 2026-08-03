// ===============================
// ELEMENTS
// ===============================
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const progressCircle = document.getElementById("progressCircle");

// ===============================
// VARIABLES
// ===============================
let timer = null;
let running = false;
let startTime = 0;
let elapsed = 0;

const circumference = 2 * Math.PI * 120; // radius = 120

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

// ===============================
// FORMAT TIME
// ===============================
function format(ms) {

    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milli = ms % 1000;

    return {
        h: String(hours).padStart(2, "0"),
        m: String(minutes).padStart(2, "0"),
        s: String(seconds).padStart(2, "0"),
        ms: String(milli).padStart(3, "0")
    };

}

// ===============================
// DISPLAY
// ===============================
function render() {

    const t = format(elapsed);

    hoursEl.textContent = t.h;
    minutesEl.textContent = t.m;
    secondsEl.textContent = t.s;
    millisecondsEl.textContent = t.ms;

    updateRing();

}

function update() {

    if (!running) return;

    elapsed = Date.now() - startTime;

    render();

}

// ===============================
// PROGRESS RING
// ===============================
function updateRing() {

    const sec = (elapsed / 1000) % 60;

    const percent = sec / 60;

    const offset = circumference - percent * circumference;

    progressCircle.style.strokeDashoffset = offset;

}

// ===============================
// START / PAUSE
// ===============================
startBtn.addEventListener("click", () => {

    if (!running) {

        running = true;

        startTime = Date.now() - elapsed;

        timer = setInterval(update, 10);

        startBtn.innerHTML =
            '<i class="fa-solid fa-pause"></i><span>Pause</span>';

    } else {

        running = false;

        clearInterval(timer);

        startBtn.innerHTML =
            '<i class="fa-solid fa-play"></i><span>Start</span>';

    }

});

// ===============================
// RESET
// ===============================
resetBtn.addEventListener("click", () => {

    running = false;

    clearInterval(timer);

    elapsed = 0;

    startTime = 0;

    progressCircle.style.strokeDashoffset = circumference;

    render();

    startBtn.innerHTML =
        '<i class="fa-solid fa-play"></i><span>Start</span>';

});

// ===============================
// INITIAL DISPLAY
// ===============================
render();