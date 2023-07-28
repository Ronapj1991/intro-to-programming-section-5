const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const arrayMessages = [...messages];
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    let remainingAttempts = maxNumberOfAttempts - attempts;
    let singularOrPlural = "guesses";
    
    if (remainingAttempts === 1) singularOrPlural = "guess";
    
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${singularOrPlural} remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < arrayMessages.length; elementIndex++) {
    arrayMessages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

function resetAttempts() {
  // Reset number of attempts
  attempts = 0;
}

function isInputBad() {
  const guess = parseInt(guessInput.value, 10);
  const belowLimitMessage = document.getElementById("input-below-limit");
  const aboveLimitMessage = document.getElementById("input-above-limit");
  
  if (aboveLimitMessage.style.display === "" || 
      belowLimitMessage.style.display === "") {
    belowLimitMessage.style.display = "none";
    aboveLimitMessage.style.display = "none";
  }
  
  if (guess < 0) {
    belowLimitMessage.style.display = "";
    return guess < 0
  } else if (guess > 99) {
    aboveLimitMessage.style.display = "";
    return guess > 99
  } else {
    checkGuess();
  }
}

submitButton.addEventListener('click', isInputBad);
//submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);
resetButton.addEventListener('click', resetAttempts)

setup();