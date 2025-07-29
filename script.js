// Ekranlar
const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

// Butonlar
const startMenuButton = document.getElementById("start-menu-button");
const stopButton = document.getElementById("stop-button");
const resumeButton = document.getElementById("resume-button");
const retryButton = document.getElementById("retry-button");
const backHomeButton = document.getElementById("back-home-button");

// Alanlar
const balloonArea = document.getElementById("balloon-area");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const finalScoreEl = document.getElementById("final-score");

// En yüksek skor alanları
const highScoreEl = document.getElementById("high-score");
const finalHighScoreEl = document.getElementById("final-high-score");

// Oyun Değişkenleri
let score = 0;
let time = 30;
let gameInterval;
let balloonInterval;
let isPaused = false;

// Yüksek skor localStorage'dan oku ya da sıfırla
let highScore = localStorage.getItem("balloonHighScore") || 0;
highScoreEl.textContent = highScore;

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// Başlat
startMenuButton.addEventListener("click", () => {
  showScreen(gameScreen);
  startGame();
});

// Yeniden Başlat
retryButton.addEventListener("click", () => {
  showScreen(gameScreen);
  startGame();
});

// Ana Menüye Dön
backHomeButton.addEventListener("click", () => {
  showScreen(homeScreen);
});

// Durdur
stopButton.addEventListener("click", () => {
  isPaused = true;
});

// Devam Et
resumeButton.addEventListener("click", () => {
  isPaused = false;
});

function startGame() {
  score = 0;
  time = 30;
  isPaused = false;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  balloonArea.innerHTML = "";
  highScoreEl.textContent = highScore;

  clearInterval(gameInterval);
  clearInterval(balloonInterval);

  gameInterval = setInterval(() => {
    if (!isPaused) {
      time--;
      timeEl.textContent = time;
      if (time <= 0) endGame();
    }
  }, 1000);

  balloonInterval = setInterval(() => {
    if (!isPaused) {
      createBalloon();
    }
  }, 900);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(balloonInterval);
  finalScoreEl.textContent = score;
  finalHighScoreEl.textContent = highScore;
  showScreen(gameOverScreen);
}

function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.top = Math.floor(Math.random() * (balloonArea.clientHeight - 70)) + "px";
  balloon.style.left = Math.floor(Math.random() * (balloonArea.clientWidth - 50)) + "px";
  balloon.style.backgroundColor = getRandomColor();

  balloon.addEventListener("click", () => {
    if (!isPaused) {
      score++;
      scoreEl.textContent = score;

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("balloonHighScore", highScore);
        highScoreEl.textContent = highScore;
      }

      balloon.remove();
      // Balon patlayınca yenisini hemen doğur
      createBalloon();
    }
  });

  balloonArea.appendChild(balloon);

  setTimeout(() => {
    balloon.remove();
  }, 3000);
}

function getRandomColor() {
  const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"];
  return colors[Math.floor(Math.random() * colors.length)];
}
