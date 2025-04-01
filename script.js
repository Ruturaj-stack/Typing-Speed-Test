const textDisplay = document.getElementById("text-display");
const textInput = document.getElementById("text-input");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const restartButton = document.getElementById("restart");

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript makes the web interactive and dynamic.",
    "Type fast to test your speed and accuracy.",
    "Programming is fun when you practice regularly.",
    "Never stop learning because life never stops teaching."
];

let currentSentence = "";
let timer = 60;
let timerInterval;
let totalTyped = 0;
let correctTyped = 0;
let isTypingStarted = false;

// Load a new sentence
function loadSentence() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    textDisplay.innerHTML = currentSentence.split("").map(char => `<span>${char}</span>`).join("");
    textInput.value = "";
    textInput.disabled = false;
    isTypingStarted = false;
    clearInterval(timerInterval);
    timerElement.textContent = "60";
    wpmElement.textContent = "0";
    accuracyElement.textContent = "0";
}

// Start the countdown timer
function startTimer() {
    timer = 60;
    timerElement.textContent = timer;
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            textInput.disabled = true;
        }
        calculateWPM();
    }, 1000);
}

// Calculate WPM and accuracy
function calculateWPM() {
    let elapsedTime = (60 - timer) / 60;
    let wordsTyped = textInput.value.trim().split(/\s+/).length;
    let wpm = Math.floor(wordsTyped / (elapsedTime || 1));
    wpmElement.textContent = isNaN(wpm) ? "0" : wpm;

    let correctCharacters = 0;
    let typedText = textInput.value;
    let allSpans = document.querySelectorAll("#text-display span");

    for (let i = 0; i < allSpans.length; i++) {
        if (typedText[i] === currentSentence[i]) {
            allSpans[i].style.color = "#00ff00"; // Green for correct
            correctCharacters++;
        } else {
            allSpans[i].style.color = "#ff4b5c"; // Red for incorrect
        }
    }

    totalTyped = typedText.length;
    correctTyped = correctCharacters;
    let accuracy = Math.floor((correctTyped / (totalTyped || 1)) * 100);
    accuracyElement.textContent = accuracy;
}

// Event listeners
textInput.addEventListener("input", () => {
    if (!isTypingStarted) {
        isTypingStarted = true;
        startTimer();
    }
    calculateWPM();
});

// Restart button
restartButton.addEventListener("click", loadSentence);

// Initialize
loadSentence();
