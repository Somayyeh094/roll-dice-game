const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

const overlay = document.querySelector(".overlay");
const modalWindow = document.querySelector(".modal-window");
const close = document.querySelector(".close");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnGuide = document.querySelector(".btn--guide");
const btnNew = document.querySelector(".btn--new");
const imgEL = document.querySelector(".dice");
const persianNum = document.querySelectorAll(".persianNum");
console.log(persianNum);
// for (i = 0; (i = persianNum.length - 1); i++) {
//   console.log(persianNum[i]);
//   persianNum.textContent = convertToPersianDigits(persianNum[i]);
// }

//Convering Eng number to Persian ones
function convertToPersianDigits(input) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.toString().replace(/\d/g, (match) => persianDigits[match]);
}

let current, activePlayer, playing, scores;

const init = function () {
  current = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  imgEL.classList.add("hidden");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.getElementById("score--0").textContent = convertToPersianDigits(0);
  document.getElementById("score--1").textContent = convertToPersianDigits(0);
  document.getElementById("current--0").textContent = convertToPersianDigits(0);
  document.getElementById("current--1").textContent = convertToPersianDigits(0);
};

init();

const switchPlayer = function () {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    convertToPersianDigits(current);
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1)roll a dice
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    //2)display dice image
    imgEL.src = `img/dice-${diceNumber}.png`;
    imgEL.classList.remove("hidden");

    //3)check for dice===1
    if (diceNumber !== 1) {
      //4) add dice to current score
      current += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        convertToPersianDigits(current);
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent =
      convertToPersianDigits(scores[activePlayer]);
    if (scores[activePlayer] < 100) {
      switchPlayer();
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.getElementById(`current--${activePlayer}`).textContent =
        convertToPersianDigits(0);
      playing = false;
    }
  }
});

btnNew.addEventListener("click", init);

//open modal window
btnGuide.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  modalWindow.style.visibility = "visible";
  if (window.innerHeight < 400) {
    modalWindow.style.transform = " translate(-50%, 0) scale(1)";
  } else {
    modalWindow.style.transform = " translate(-50%, -50%) scale(1)";
  }
});

//close modal window

const closeModal = function () {
  overlay.classList.add("hidden");
  modalWindow.style.transform = " translate(-50%, -50%) scale(.05)";
  modalWindow.style.visibility = "hidden";
};

overlay.addEventListener("click", closeModal);
close.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});
