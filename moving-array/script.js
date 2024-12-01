const numbersContainer = document.querySelector('#numbers-container');
const errorContainer = document.querySelector('#error-container');
const itemInput = document.querySelector('#item-input');
const countInput = document.querySelector('#count-input');
const submitBtn = document.querySelector('#submit-btn');
const type = document.getElementsByName('type');

const CHANGE_TYPE = {
  UP: "UP",
  DOWN: "DOWN",
};

const ERROR_TYPE = {
  NOT_FOUND: "NOT_FOUND",
  NOT_POSSIBLE: "NOT_POSSIBLE",
  INVALID_INPUT: "INVALID_INPUT",
};

let numbers = [4, 6, 10, 23, 0, 24, 30, 2];

function createNumbers() {
  numbersContainer.innerHTML = '';
  numbers.forEach(number => {
    const numberElement = document.createElement('span');
    numberElement.textContent = number;
    numbersContainer.appendChild(numberElement);
  });
}

createNumbers();

function renderError(message) {
  errorContainer.innerHTML = '';
  if (message !== "") {
    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    errorElement.id = 'error';
    errorContainer.appendChild(errorElement);
  }
}

type[0].addEventListener('click', () => {
  type[0].checked = true;
  type[1].checked = false;
});

type[1].addEventListener('click', () => {
  type[1].checked = true;
  type[0].checked = false;
});

submitBtn.addEventListener('click', () => {
  const targetIndex = numbers.indexOf(Number(itemInput.value));
  const steps = Number(countInput.value)
  const moveType = type[0].checked ? CHANGE_TYPE.UP : CHANGE_TYPE.DOWN;

  if (itemInput.value === "" || steps === 0) {
    renderError(ERROR_TYPE.INVALID_INPUT);
    return;
  }
  if (targetIndex === -1) {
    renderError(ERROR_TYPE.NOT_FOUND);
    return;
  }

  const newIndexUp = targetIndex + 1 + steps;
  const newIndexDown = targetIndex - 1 - steps;

  if (
    (moveType === CHANGE_TYPE.DOWN && (newIndexDown < 0 || newIndexDown >= numbers.length)) ||
    (moveType === CHANGE_TYPE.UP && newIndexUp >= numbers.length)
  ) {
    renderError(ERROR_TYPE.NOT_POSSIBLE);
    return;
  }

  const [element] = numbers.splice(targetIndex, 1);

  if (moveType === CHANGE_TYPE.UP) {
    numbers.splice(newIndexUp, 0, element);
  } else if (moveType === CHANGE_TYPE.DOWN) {
    numbers.splice(newIndexDown, 0, element);
  }
  renderError("");
  createNumbers();
});