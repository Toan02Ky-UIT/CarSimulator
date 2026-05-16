const speedText = document.createElement("div");
const scoreText = document.createElement("div");
const gameOverText = document.createElement("div");

let score = 0;

// ===== SPEED =====

speedText.style.position = "absolute";
speedText.style.top = "20px";
speedText.style.left = "20px";

speedText.style.color = "white";
speedText.style.fontSize = "24px";
speedText.style.fontFamily = "Arial";

document.body.appendChild(speedText);

// ===== SCORE =====

scoreText.style.position = "absolute";
scoreText.style.top = "60px";
scoreText.style.left = "20px";

scoreText.style.color = "white";
scoreText.style.fontSize = "24px";
scoreText.style.fontFamily = "Arial";

document.body.appendChild(scoreText);

// ===== GAME OVER =====

gameOverText.style.position = "absolute";

gameOverText.style.top = "50%";
gameOverText.style.left = "50%";

gameOverText.style.transform = "translate(-50%, -50%)";

gameOverText.style.color = "red";
gameOverText.style.fontSize = "64px";
gameOverText.style.fontWeight = "bold";
gameOverText.style.fontFamily = "Arial";

gameOverText.style.display = "none";

gameOverText.innerHTML = "GAME OVER";

document.body.appendChild(gameOverText);

// ===== FUNCTIONS =====

export function updateUI(speed) {
  score += 0.1;

  speedText.innerHTML = `Speed: ${Math.abs(speed * 1000).toFixed(0)} km/h`;

  scoreText.innerHTML = `Score: ${Math.floor(score)}`;
}

export function showGameOver() {
  gameOverText.style.display = "block";
}

export function hideGameOver() {
  gameOverText.style.display = "none";
}

export function resetScore() {
  score = 0;
}
