// TODO -- Add different colors for each team. Add different color board and player option button.
// Add scoring functionality. Fix score buttons names. They still say Q and V
// Fix king so that color will stay with piece when it moves.
// Add media queries for smaller devices.
// Simplify code and look for reused code that can be made into its own function.
// Are all of the functions for 'clickedCells' necessary?
// Consider renaming cellsData and clickedCells to positionData or playerPos. Would it make sense?
// kind of but kind of not too. using 'cells' may be more suitable considering what the functions do
// split into modules.

const cells = [...document.querySelectorAll('.square')];
const buttons = document.querySelectorAll('button');
// checkboar cells(squares) data
function cellsData() {
  const clickedCells = [];// Holds data in position 0 and 1 for current and nextPosition

  function addCells(el) {
    clickedCells.push(el);
  }

  function clearCells() {
    for (let i = 0; i <= clickedCells.length; i++) {
      clickedCells.pop();
    }
    console.log('cleared cells', clickedCells);
  }

  function initialize() {
    cells.forEach((cell) => {
      if (cell.id >= 1 && cell.id <= 12 && cell.classList.contains('blue')) {
        cell.innerText = '2';
      }

      if (cell.id <= 24 && cell.id >= 13 && cell.classList.contains('blue')) {
        cell.innerText = 'Y';
      }

      if (cell.id === 'mid-board-blues') {
        cell.innerText = '';
      }
      cell.style.color = 'black';
      cell.style.fontWeight = 1;
    });
  }

  function toggleCell() {
    if (!clickedCells[0]) return;
    if (clickedCells[0].innerText === '') return clickedCells[0].innerText = '2';
    if (clickedCells[0].innerText === '2') return clickedCells[0].innerText = 'Y';
    if (clickedCells[0].innerText === 'Y') return clickedCells[0].innerText = '2';
  }

  function getCells() {
    return clickedCells;
  }

  function swapCells0and1() {
    [clickedCells[1], clickedCells[0]] = [clickedCells[0], clickedCells[1]];
  }

  function displayCells0and1OnBoard() {
    [clickedCells[1].innerText, clickedCells[0].innerText] = [clickedCells[0].innerText, clickedCells[1].innerText];
  }

  function clearCell0() {
    if (!clickedCells[0]) return;
    clickedCells[0].innerText = '';
  }

  return ({
    addCells,
    clearCells,
    getCells,
    swapCells0and1,
    displayCells0and1OnBoard,
    clearCell0,
    toggleCell,
    initialize,
  });
}

function checkForLegalMove() {
  const cell0Background = window.getComputedStyle(playerCells.getCells()[0]).getPropertyValue('background-color');
  const cell1Background = window.getComputedStyle(playerCells.getCells()[1]).getPropertyValue('background-color');
  if (playerCells.getCells().length === 2
    && !playerCells.getCells()[1].textContent
    && cell0Background === cell1Background) { // ensures only moving on blue cells
    return playerCells.getCells();
  }
  // else
  return null;
}

function makeMove() {
  playerCells.swapCells0and1();
}

function displayMoves() {
  playerCells.displayCells0and1OnBoard();
}

function highlightCell(el) {
  el.style.border = '2px solid white';
}

function clearHightlightedCells() {
  cells.forEach((cell) => cell.style.border = '1px solid black');
}

function removeChecker() {
  playerCells.clearCell0();
  playerCells.clearCells();
}

function addChecker() {
  playerCells.toggleCell();
  playerCells.clearCells();
  clearHightlightedCells();
}

function resetBoard() {
  playerCells.initialize();
  playerCells.clearCells();
  clearHightlightedCells();
}

/* function makeKing() {
  if (!playerCells.getCells()[0]) return;
  const el = playerCells.getCells()[0];
  el.style.color = 'yellow';
  el.style.fontWeight = '1000';
  el.style.fontSize = '3.0em';
  playerCells.clearCells();
  clearHightlightedCells();
} */


function buttonClickHandler(event) {
  if (this.innerText === 'Remove Checker') removeChecker();
  if (this.innerText === 'Add Checker') addChecker();
  /* if (this.innerText === 'Make King') makeKing(); */
  if (this.innerText === 'New Game') resetBoard();
  clearHightlightedCells();
}

function boardClickHandler() {
  console.log(this);
  highlightCell(this);// put white border on clicked cell
  playerCells.addCells(this);// adds the cells player clicked on
  console.log(playerCells.getCells());
  if (playerCells.getCells().length < 2) return;// only checks after second click
  if (checkForLegalMove(this)) {
    console.log('moving player');
    makeMove();
    displayMoves();
    playerCells.clearCells();
    clearHightlightedCells();
  } else { // illegal move
    console.log('illegal move');
    playerCells.clearCells();
    clearHightlightedCells();
  }
}

cells.forEach((cell) => cell.addEventListener(('click'), boardClickHandler));
buttons.forEach((button) => button.addEventListener('click', buttonClickHandler));
const playerCells = cellsData();// playerCells to access cells data array
