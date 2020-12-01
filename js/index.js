// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/

const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: "",
  aiHand: "",
};

const hands = [...document.querySelectorAll(".select__list-item")];

// Hand Selection
function handSelection() {
  game.playerHand = this.dataset.option;
  console.log(game.playerHand);
  hands.forEach((hand) => (hand.style.backgroundColor = ""));
  this.style.backgroundColor = "#000";
  console.log(this);
}

// AI
function aiChoice() {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}

// Game Results
function checkResult(player, ai) {
  // console.log(player, ai);
  if (player === ai) {
    return "draw";
  } else if (
    (player === "paper" && ai === "rock") ||
    (player === "rock" && ai === "scissors") ||
    (player === "scissors" && ai === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

// Display Result

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;

  document.querySelector('[data-summary="ai-choice"]').textContent = ai;

  document.getElementById("round").textContent = ++gameSummary.numbers;

  if (result === "win") {
    document.getElementById("win").textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "You";
    document.querySelector('[data-summary="who-win"]').style.color = "green";
  } else if (result === "lose") {
    document.getElementById("lose").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent = "AI";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  } else {
    document.getElementById("draw").textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Draw";
    document.querySelector('[data-summary="who-win"]').style.color = "gray";
  }
}

function endGame() {
  document.querySelector(
    `[data-option="${game.playerHand}"]`
  ).style.backgroundColor = "";

  game.playerHand = "";
  game.aiHand = "";
}
//Start Game
function startGame() {
  if (!game.playerHand) {
    return alert("You must choose a hand !!!");
  }
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  //console.log(gameResult);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

hands.forEach((hand) => hand.addEventListener("click", handSelection));

document.querySelector(".select__button").addEventListener("click", startGame);

//Modal
document.querySelector(".header__rules").addEventListener("click", function () {
  console.log("click");
  document.querySelector(".modal-wrapper").classList.add("active");
});

document.querySelector(".modal__close").addEventListener("click", function () {
  document.querySelector(".modal-wrapper").classList.remove("active");
});
