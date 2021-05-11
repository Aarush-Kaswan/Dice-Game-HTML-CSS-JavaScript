// Selecting Elements
const mainScore0 = document.querySelector("#score--0");
const mainScore1 = document.querySelector("#score--1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// Starting Conditions
mainScore0.textContent = 0;
mainScore1.textContent = 0;
current0.textContent = 0;
current1.textContent = 0;
diceElement.classList.add("hidden");

// Some varibles
let scores;
let currentScore;
let activePlayer;
let playing;

/* *-------------------Initialisation------------------* */

const initialisation = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  mainScore0.textContent = 0;
  mainScore1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceElement.classList.add("hidden");

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

initialisation();

/* *--------------------Switching----------------------* */

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(
    `#current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(
    `#current--${activePlayer}`
  ).textcontent = currentScore;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

/* *-------------------Roll Dice BTN-------------------* */

// Rolling Dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating random number
    let dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;

    //3. Check for 1: if true switch player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

/* *-------------------Hold Dice BTN-------------------* */

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to main score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score > 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 3. Switch player
      switchPlayer();
    }
  }
});

/* *-------------------New Dice BTN--------------------* */

btnNew.addEventListener("click", initialisation);
