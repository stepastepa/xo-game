let gameField = document.querySelector('.game-field');
let fields = document.querySelectorAll('.field div');
let playerSwitcher = document.querySelector('.player-switcher');
let player1 = document.querySelector('.player1');
let player2 = document.querySelector('.player2');
let resetBtn = document.querySelector('.resetButton');
let gameOver = false;
let score1 = document.querySelector('.score1');
let score2 = document.querySelector('.score2');

playerSwitcher.addEventListener('click', whosTurn);

function whosTurn() {
  console.log('switch!');
  // toggle active button:
  if(player1.classList.contains('active')) {
    player1.classList.remove('active');
    player2.classList.add('active');
  } else {
    player1.classList.add('active');
    player2.classList.remove('active');
  }
}

gameField.addEventListener('click', (e)=>{addMarker(e.target)});

function addMarker(xxx) {
  if(gameOver === false && !xxx.classList.contains('field') && !xxx.innerText) {
    if(player1.classList.contains('active')) {
      xxx.textContent = 'X';
    } else {
      xxx.textContent = 'O';
    }
    checkForWinner();
  }
}

function checkForWinner() {
  // 0 1 2
  // 3 4 5
  // 6 7 8
  winnerRow(0, 1, 2) ||
  winnerRow(3, 4, 5) ||
  winnerRow(6, 7, 8) ||

  winnerRow(0, 3, 6) ||
  winnerRow(1, 4, 7) ||
  winnerRow(2, 5, 8) ||

  winnerRow(0, 4, 8) ||
  winnerRow(2, 4, 6) ||
  whosTurn(); // switch player if not WIN ( false || ... )
}

function winnerRow(x, y, z) {
  let answer = fields[x].textContent + fields[y].textContent + fields[z].textContent;

  if(answer === 'XXX' || answer === 'OOO') {
    fields[x].parentElement.classList.add('win');
    fields[y].parentElement.classList.add('win');
    fields[z].parentElement.classList.add('win');

    // freeze:
    gameOver = true;

    // add score:
    if(answer === 'XXX') {
      addScore(score1);
    } else {
      addScore(score2);
    }

    return true;
  }
}

function addScore(xxx) {
  xxx.textContent = (+xxx.textContent) + 1;
}

resetBtn.addEventListener('click', resetFields);

function resetFields() {
  for(const field of fields) {
    field.innerHTML = '';
    field.parentElement.classList.remove('win');
  }

  // unfreeze:
  gameOver = false;
}
