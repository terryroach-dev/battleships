const compGrid = document.getElementById("comp-grid");
const playerGrid = document.getElementById("player-grid");
const compSection = document.querySelector(".comp-section");
const playerSection = document.querySelector(".player-section");
const setupInstructions = document.getElementById("setup-instructions");
const title = document.getElementById("title");
const confirmPositions = document.getElementById("confirm-positions");
const playAgain = document.getElementById("play-again");
const message = document.getElementById("message");
const openingPage = document.getElementById("opening-page");
const startGameBtn = document.getElementById("start-game-btn");
const turn = document.getElementById("turn");
let compAvailableShots = [];
let compTargetedAvailableShots = [];
let compHadPreviousHit = false;
let lastCompHit = null;
let currentCompAttackDirection = 0;
let compPositions = [];
let playerPositions = [];
let playerSelections = 0;
let playerTurn = false;
let compTurn = false;
let singleShipPosition = [];
let compShipPositions = [];
let playerShipPositions = [];
let compShips;
let playerShips;

// Function to set up the 5 ships and their default settings for the player and computer
function setShips() {
  compShips = [
    {
      name: "shipOne",
      length: 5,
      isSunk: false,
      squares: [],
      squaresHit: [],
    },
    {
      name: "shipTwo",
      length: 4,
      isSunk: false,
      squares: [],
      squaresHit: [],
    },
    {
      name: "shipThree",
      length: 3,
      isSunk: false,
      squares: [],
      squaresHit: [],
    },
    {
      name: "shipFour",
      length: 3,
      isSunk: false,
      squares: [],
      squaresHit: [],
    },
    {
      name: "shipFive",
      length: 2,
      isSunk: false,
      squares: [],
      squaresHit: [],
    },
  ];
  playerShips = [
    {
      name: "shipOne",
      length: 5,
      isSunk: false,
      squares: [],
      squaresHit: [],
      underAttack: false,
      direction: 0,
      potentialTargets: [],
    },
    {
      name: "shipTwo",
      length: 4,
      isSunk: false,
      squares: [],
      squaresHit: [],
      underAttack: false,
      direction: 0,
      potentialTargets: [],
    },
    {
      name: "shipThree",
      length: 3,
      isSunk: false,
      squares: [],
      squaresHit: [],
      underAttack: false,
      direction: 0,
      potentialTargets: [],
    },
    {
      name: "shipFour",
      length: 3,
      isSunk: false,
      squares: [],
      squaresHit: [],
      underAttack: false,
      direction: 0,
      potentialTargets: [],
    },
    {
      name: "shipFive",
      length: 2,
      isSunk: false,
      squares: [],
      squaresHit: [],
      underAttack: false,
      direction: 0,
      potentialTargets: [],
    },
  ];
}

// Function to check of any square in the single ship position is already taken
function isSquareAlreadyPopulated(arr1, arr2) {
  return arr1.some((element) => arr2.includes(element));
}

// Function to set the ship positions for the computer
function setCompShipPosistions() {
  let shipIndex = 0;
  while (shipIndex < 5) {
    let randStartSquare = Math.floor(Math.random() * 100);
    let randDirection = Math.floor(Math.random() * 2);
    let currentShipLength = compShips[shipIndex].length;
    singleShipPosition = [];

    if (currentShipLength === 5) {
      if (randDirection === 0 && randStartSquare % 10 < 6) {
        for (
          let i = randStartSquare;
          i < randStartSquare + currentShipLength;
          i++
        ) {
          singleShipPosition.push(i);
        }
        let squareTaken = isSquareAlreadyPopulated(
          compShipPositions,
          singleShipPosition
        );
        for (let i = 0; i < singleShipPosition.length; i++) {
          compShipPositions.push(singleShipPosition[i]);
          compPositions[singleShipPosition[i]] += " comp-ship";
          compShips[0].squares.push(singleShipPosition[i]);
        }
        shipIndex++;
      }
    }
    if (currentShipLength === 5) {
      if (randDirection === 1 && randStartSquare < 60) {
        for (let i = randStartSquare; i < randStartSquare + 50; i += 10) {
          singleShipPosition.push(i);
        }
        let squareTaken = isSquareAlreadyPopulated(
          compShipPositions,
          singleShipPosition
        );
        for (let i = 0; i < singleShipPosition.length; i++) {
          compShipPositions.push(singleShipPosition[i]);
          compPositions[singleShipPosition[i]] += " comp-ship";
          compShips[0].squares.push(singleShipPosition[i]);
        }
        shipIndex++;
      }
    }
    if (currentShipLength === 4) {
      if (randDirection === 0 && randStartSquare % 10 < 7) {
        for (
          let i = randStartSquare;
          i < randStartSquare + currentShipLength;
          i++
        ) {
          singleShipPosition.push(i);
        }
        let squareTaken = isSquareAlreadyPopulated(
          compShipPositions,
          singleShipPosition
        );
        if (squareTaken === false) {
          for (let i = 0; i < singleShipPosition.length; i++) {
            compShipPositions.push(singleShipPosition[i]);
            compPositions[singleShipPosition[i]] += " comp-ship";
            compShips[1].squares.push(singleShipPosition[i]);
          }
          shipIndex++;
        }
      }
    }
    if (currentShipLength === 4) {
      if (randDirection === 1 && randStartSquare < 70) {
        for (let i = randStartSquare; i < randStartSquare + 40; i += 10) {
          singleShipPosition.push(i);
        }
        let squareTaken = isSquareAlreadyPopulated(
          compShipPositions,
          singleShipPosition
        );
        if (squareTaken === false) {
          for (let i = 0; i < singleShipPosition.length; i++) {
            compShipPositions.push(singleShipPosition[i]);
            compPositions[singleShipPosition[i]] += " comp-ship";
            compShips[1].squares.push(singleShipPosition[i]);
          }
          shipIndex++;
        }
      }
    }
    if (currentShipLength === 3) {
      if (randDirection === 0 && randStartSquare % 10 < 8) {
        for (
          let i = randStartSquare;
          i < randStartSquare + currentShipLength;
          i++
        ) {
          singleShipPosition.push(i);
        }
        let squareTaken = isSquareAlreadyPopulated(
          compShipPositions,
          singleShipPosition
        );
        if (squareTaken === false) {
          for (let i = 0; i < singleShipPosition.length; i++) {
            compShipPositions.push(singleShipPosition[i]);
            compPositions[singleShipPosition[i]] += " comp-ship";
            if (compShips[2].squares.length <= 2) {
              compShips[2].squares.push(singleShipPosition[i]);
            } else {
              compShips[3].squares.push(singleShipPosition[i]);
            }
          }
          shipIndex++;
        }
      }
    }
    if (currentShipLength === 3) {
      if (randDirection === 1 && randStartSquare < 80) {
        for (let i = randStartSquare; i < randStartSquare + 30; i += 10) {
          singleShipPosition.push(i);
        }
        let squareTaken = isSquareAlreadyPopulated(
          compShipPositions,
          singleShipPosition
        );
        if (squareTaken === false) {
          for (let i = 0; i < singleShipPosition.length; i++) {
            compShipPositions.push(singleShipPosition[i]);
            compPositions[singleShipPosition[i]] += " comp-ship";
            if (compShips[2].squares.length <= 2) {
              compShips[2].squares.push(singleShipPosition[i]);
            } else {
              compShips[3].squares.push(singleShipPosition[i]);
            }
          }
          shipIndex++;
        }
      }
    }
    if (currentShipLength === 2) {
      if (randDirection === 0 && randStartSquare % 10 < 9) {
        for (
          let i = randStartSquare;
          i < randStartSquare + currentShipLength;
          i++
        ) {
          singleShipPosition.push(i);
        }
        let squareTaken = isSquareAlreadyPopulated(
          compShipPositions,
          singleShipPosition
        );
        if (squareTaken === false) {
          for (let i = 0; i < singleShipPosition.length; i++) {
            compShipPositions.push(singleShipPosition[i]);
            compPositions[singleShipPosition[i]] += " comp-ship";
            compShips[4].squares.push(singleShipPosition[i]);
          }
          shipIndex++;
        }
      }
    }
    if (currentShipLength === 2) {
      if (randDirection === 1 && randStartSquare < 90) {
        for (let i = randStartSquare; i < randStartSquare + 20; i += 10) {
          singleShipPosition.push(i);
        }
        let squareTaken = isSquareAlreadyPopulated(
          compShipPositions,
          singleShipPosition
        );
        if (squareTaken === false) {
          for (let i = 0; i < singleShipPosition.length; i++) {
            compShipPositions.push(singleShipPosition[i]);
            compPositions[singleShipPosition[i]] += " comp-ship";
            compShips[4].squares.push(singleShipPosition[i]);
          }
          shipIndex++;
        }
      }
    }
  }
  drawCompGrid();
}

// Function to draw the computer grid
function drawCompGrid() {
  let compGridHtml = "";
  for (let i = 0; i < 100; i++) {
    compGridHtml += `<div class="grid-square ${compPositions[i]}" id="${i}"></div>`;
  }
  compGrid.innerHTML = compGridHtml;
}

// Function to draw the player grid
function drawPlayerGrid() {
  let playerGridHtml = "";
  for (let i = 0; i < 100; i++) {
    playerGridHtml += `<div class="grid-square ${playerPositions[i]}" id="${i}"></div>`;
  }
  playerGrid.innerHTML = playerGridHtml;
}

// Function to set 100 'empty' computer grid positions and push to array
function setCompGridPositions() {
  for (let target = 0; target < 100; target++) {
    compPositions.push("empty");
  }
}

// Function to set 100 'empty' player grid positions and push to array
function setPlayerGridPositions() {
  for (let i = 0; i < 100; i++) {
    playerPositions.push("empty");
  }
}

// Event listener on 'playerGrid' to enable setting player ship positions
playerGrid.addEventListener("click", selectPlayerPositions);

// Event listener on 'confirmPositions' button to confirm player ship positions
confirmPositions.addEventListener("click", function () {
  if (playerSelections === 5) {
    setCompGridPositions();
    setCompShipPosistions();
    setupInstructions.classList.add("hide");
    compSection.classList.remove("hide");
    playerSection.classList.add("hide");
    confirmPositions.classList.add("hide");
    turn.textContent = "Your turn";
    turn.classList.remove("hide");
    compAvailableShots = [];
    compTargetedAvailableShots = [];
    for (let i = 0; i < 100; i++) {
      compAvailableShots.push(i);
    }
  } else {
    message.textContent = "Place 5 ships";
    message.classList.remove("hide");
    setTimeout(function () {
      message.classList.add("hide");
    }, 1500);
  }
});

// Function to enable the player to click the target they want to attack on the 'compGrid'
function clickCompGrid(e) {
  if (
    !e.target.classList.contains("hit") &&
    !e.target.classList.contains("miss") &&
    !e.target.classList.contains("sunk")
  ) {
    if (e.target.className === "grid-square empty comp-ship") {
      playerTurn = false;
      compGrid.removeEventListener("click", clickCompGrid);
      compPositions[e.target.id] += " hit";
      recordSquareHit(e.target.id);
      message.textContent = "Hit!!";
      message.classList.remove("hide");
      setTimeout(function () {
        message.classList.add("hide");
      }, 500);
      checkIfShipSunk();
    } else {
      playerTurn = false;
      compGrid.removeEventListener("click", clickCompGrid);
      compPositions[e.target.id] += " miss";
      message.textContent = "Miss";
      message.classList.remove("hide");
      setTimeout(function () {
        message.classList.add("hide");
      }, 500);
      drawCompGrid();
      compTurn = true;
      setTimeout(function () {
        playerSection.classList.remove("hide");
        compSection.classList.add("hide");
        turn.textContent = "Computer Shot incoming...";
      }, 1500);
      setTimeout(compShot, 3000);
    }
  } else {
    message.textContent = "You have already selected that square";
    message.classList.remove("hide");
    setTimeout(function () {
      message.classList.add("hide");
    }, 1500);
  }
}

// Function to set the ship positions for the player
function selectPlayerPositions(e) {
  let acrossSquares = 4 - playerSelections;
  let downSquare = acrossSquares * 10;
  let startingSquare = Number(e.target.id);
  let endSquareAcross = startingSquare + acrossSquares;
  let endSquareDown = startingSquare + downSquare;
  const selectionAcross = [];
  const selectionDown = [];
  if (!playerShipPositions.includes(startingSquare)) {
    if (
      playerSelections === 0 &&
      startingSquare % 10 < 6 &&
      endSquareDown < 100
    ) {
      playerPositions[startingSquare] += " player-selected";
      playerPositions[endSquareAcross] += " player-option";
      playerPositions[endSquareDown] += " player-option";
      selectEndingSquare(startingSquare, endSquareAcross, endSquareDown);
      playerGrid.removeEventListener("click", selectPlayerPositions);
    } else if (playerSelections === 0 && startingSquare % 10 < 6) {
      playerPositions[startingSquare] += " player-selected";
      playerPositions[endSquareAcross] += " player-option";
      selectEndingSquare(startingSquare, endSquareAcross, null);
      playerGrid.removeEventListener("click", selectPlayerPositions);
    } else if (playerSelections === 0 && endSquareDown < 100) {
      playerPositions[startingSquare] += " player-selected";
      playerPositions[endSquareDown] += " player-option";
      selectEndingSquare(startingSquare, null, endSquareDown);
      playerGrid.removeEventListener("click", selectPlayerPositions);
    } else if (
      playerSelections === 1 &&
      startingSquare % 10 < 7 &&
      endSquareDown < 100
    ) {
      for (let i = 0; i < 4; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenAcross = isSquareAlreadyPopulated(
        selectionAcross,
        playerShipPositions
      );
      const squareTakenDown = isSquareAlreadyPopulated(
        selectionDown,
        playerShipPositions
      );
      if (!squareTakenAcross && !squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross] += " player-option";
        playerPositions[endSquareDown] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross, endSquareDown);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      } else if (squareTakenDown && !squareTakenAcross) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross, null);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      } else if (squareTakenAcross && !squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareDown] += " player-option";
        selectEndingSquare(startingSquare, null, endSquareDown);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (playerSelections === 1 && startingSquare % 10 < 7) {
      for (let i = 0; i < 4; i++) {
        selectionAcross.push(startingSquare + i);
      }
      const squareTakenAcross = isSquareAlreadyPopulated(
        selectionAcross,
        playerShipPositions
      );
      if (!squareTakenAcross) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross, null);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (playerSelections === 1 && endSquareDown < 100) {
      for (let i = 0; i < 4; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenDown = isSquareAlreadyPopulated(
        selectionDown,
        playerShipPositions
      );
      if (!squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareDown] += " player-option";
        selectEndingSquare(startingSquare, null, endSquareDown);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (
      playerSelections === 2 &&
      startingSquare % 10 < 8 &&
      endSquareDown < 100
    ) {
      for (let i = 0; i < 3; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenAcross = isSquareAlreadyPopulated(
        selectionAcross,
        playerShipPositions
      );
      const squareTakenDown = isSquareAlreadyPopulated(
        selectionDown,
        playerShipPositions
      );
      if (!squareTakenAcross && !squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross] += " player-option";
        playerPositions[endSquareDown] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross, endSquareDown);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      } else if (squareTakenDown && !squareTakenAcross) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross, null);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      } else if (squareTakenAcross && !squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareDown] += " player-option";
        selectEndingSquare(startingSquare, null, endSquareDown);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (playerSelections === 2 && startingSquare % 10 < 8) {
      for (let i = 0; i < 3; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenAcross = isSquareAlreadyPopulated(
        selectionAcross,
        playerShipPositions
      );
      if (!squareTakenAcross) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross, null);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (playerSelections === 2 && endSquareDown < 100) {
      for (let i = 0; i < 3; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenDown = isSquareAlreadyPopulated(
        selectionDown,
        playerShipPositions
      );
      if (!squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareDown] += " player-option";
        selectEndingSquare(startingSquare, null, endSquareDown);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (
      playerSelections === 3 &&
      startingSquare % 10 < 8 &&
      endSquareDown < 100
    ) {
      for (let i = 0; i < 3; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenAcross = isSquareAlreadyPopulated(
        selectionAcross,
        playerShipPositions
      );
      const squareTakenDown = isSquareAlreadyPopulated(
        selectionDown,
        playerShipPositions
      );
      if (!squareTakenAcross && !squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross + 1] += " player-option";
        playerPositions[endSquareDown + 10] += " player-option";
        selectEndingSquare(
          startingSquare,
          endSquareAcross + 1,
          endSquareDown + 10
        );
        playerGrid.removeEventListener("click", selectPlayerPositions);
      } else if (squareTakenDown && !squareTakenAcross) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross + 1] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross + 1, null);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      } else if (squareTakenAcross && !squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareDown + 10] += " player-option";
        selectEndingSquare(startingSquare, null, endSquareDown + 10);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (playerSelections === 3 && startingSquare % 10 < 8) {
      for (let i = 0; i < 3; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenAcross = isSquareAlreadyPopulated(
        selectionAcross,
        playerShipPositions
      );
      if (!squareTakenAcross) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross + 1] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross + 1, null);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (playerSelections === 3 && endSquareDown < 100) {
      for (let i = 0; i < 3; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenDown = isSquareAlreadyPopulated(
        selectionDown,
        playerShipPositions
      );
      if (!squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareDown + 10] += " player-option";
        selectEndingSquare(startingSquare, null, endSquareDown + 10);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (
      playerSelections === 4 &&
      startingSquare % 10 < 9 &&
      endSquareDown < 100
    ) {
      for (let i = 0; i < 2; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenAcross = isSquareAlreadyPopulated(
        selectionAcross,
        playerShipPositions
      );
      const squareTakenDown = isSquareAlreadyPopulated(
        selectionDown,
        playerShipPositions
      );
      if (!squareTakenAcross && !squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross + 1] += " player-option";
        playerPositions[endSquareDown + 10] += " player-option";
        selectEndingSquare(
          startingSquare,
          endSquareAcross + 1,
          endSquareDown + 10
        );
        playerGrid.removeEventListener("click", selectPlayerPositions);
      } else if (squareTakenDown && !squareTakenAcross) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross + 1] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross + 1, null);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      } else if (squareTakenAcross && !squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareDown + 10] += " player-option";
        selectEndingSquare(startingSquare, null, endSquareDown + 10);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (playerSelections === 4 && startingSquare % 10 < 9) {
      for (let i = 0; i < 2; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenAcross = isSquareAlreadyPopulated(
        selectionAcross,
        playerShipPositions
      );
      if (!squareTakenAcross) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareAcross + 1] += " player-option";
        selectEndingSquare(startingSquare, endSquareAcross + 1, null);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    } else if (playerSelections === 4 && endSquareDown < 100) {
      for (let i = 0; i < 2; i++) {
        selectionAcross.push(startingSquare + i);
        selectionDown.push(startingSquare + i * 10);
      }
      const squareTakenDown = isSquareAlreadyPopulated(
        selectionDown,
        playerShipPositions
      );
      if (!squareTakenDown) {
        playerPositions[startingSquare] += " player-selected";
        playerPositions[endSquareDown + 10] += " player-option";
        selectEndingSquare(startingSquare, null, endSquareDown + 10);
        playerGrid.removeEventListener("click", selectPlayerPositions);
      }
    }
    drawPlayerGrid();
  }
}

// Function to select the end square of the player selection, setting it horizontal or vertical
function selectEndingSquare(startingSquare, endSquareAcross, endSquareDown) {
  playerGrid.addEventListener("click", setEndingPositions);
  function setEndingPositions(e) {
    if (Number(e.target.id) === endSquareAcross) {
      for (let i = 0; i < playerShips[playerSelections].length; i++) {
        playerPositions[startingSquare + i] = "ship";
        playerShips[playerSelections].squares.push(startingSquare + i);
        playerShipPositions.push(startingSquare + i);
      }
      playerGrid.removeEventListener("click", setEndingPositions);
      playerPositions[endSquareDown] = "empty";
      playerSelections++;
      if (playerSelections < 5) {
        playerGrid.addEventListener("click", selectPlayerPositions);
      } else {
        playerTurn = true;
        playerShot();
      }
      drawPlayerGrid();
    } else if (Number(e.target.id) === endSquareDown) {
      for (let i = 0; i < playerShips[playerSelections].length; i++) {
        playerPositions[startingSquare + i * 10] = "ship";
        playerShips[playerSelections].squares.push(startingSquare + i * 10);
        playerShipPositions.push(startingSquare + i * 10);
      }
      playerGrid.removeEventListener("click", setEndingPositions);

      playerPositions[endSquareAcross] = "empty";
      playerSelections++;
      if (playerSelections < 5) {
        playerGrid.addEventListener("click", selectPlayerPositions);
      } else {
        playerTurn = true;
        playerShot();
      }
      drawPlayerGrid();
    } else {
      console.log("Select an end square");
    }
  }
}

// Function to add the event listener to the 'compGrid'
function playerShot() {
  if (playerTurn) {
    compGrid.addEventListener("click", clickCompGrid);
  }
}

// Function to take a shot for the computer
function compShot() {
  let randNum;
  let randTarget;
  if (compTargetedAvailableShots.length > 0) {
    randNum = Math.floor(Math.random() * compTargetedAvailableShots.length);
    randTarget = compTargetedAvailableShots[randNum];
    compTargetedAvailableShots.splice(randNum, 1);
    const index = compAvailableShots.indexOf(randTarget);
    compAvailableShots.splice(index, 1);
  } else {
    randNum = Math.floor(Math.random() * compAvailableShots.length);
    randTarget = compAvailableShots[randNum];
    compAvailableShots.splice(randNum, 1);
  }

  if (compTurn) {
    if (playerPositions[randTarget] === "ship") {
      compTurn = false;
      recordPlayerSquareHit(randTarget);
      playerPositions[randTarget] += " hit";
      message.textContent = "Hit!!";
      message.classList.remove("hide");
      setTimeout(function () {
        message.classList.add("hide");
      }, 500);
      compTargetedAvailableShots = [];
      lastCompHit = randTarget;
      checkIfPlayerShipSunk();
      recordPlayerShipUnderAttack(randTarget);
      identifyPlayerHitShipDirection(randTarget);
      setPlayerShipsPotentialTargets();
    } else if (playerPositions[randTarget] === "empty") {
      compTurn = false;
      playerPositions[randTarget] += " miss";
      message.textContent = "Miss";
      message.classList.remove("hide");
      setTimeout(function () {
        message.classList.add("hide");
      }, 500);
      playerTurn = true;
      playerShot();
      setTimeout(function () {
        playerSection.classList.add("hide");
        compSection.classList.remove("hide");
        turn.textContent = "Your turn";
      }, 1500);
    } else {
      setTimeout(compShot, 3000);
    }
    lastCompTarget = randTarget;
    drawPlayerGrid();
  }
}

// Function to add a 'hit' by the player to the computer ships 'squaresHit' array
function recordSquareHit(id) {
  id = Number(id);
  for (let ship of compShips) {
    if (ship.squares.includes(id)) {
      ship.squaresHit.push(id);
    }
  }
}

// Function to add a 'hit' by the computer to the player ships 'squaresHit' array
function recordPlayerSquareHit(id) {
  id = Number(id);
  for (let ship of playerShips) {
    if (ship.squares.includes(id)) {
      ship.squaresHit.push(id);
    }
  }
}

// Function to update if a player ship is 'underAttack'
function recordPlayerShipUnderAttack(id) {
  id = Number(id);
  for (let ship of playerShips) {
    if (ship.squares.includes(id)) {
      if (ship.isSunk) {
        ship.underAttack = false;
      } else {
        ship.underAttack = true;
      }
    }
  }
}

// Function to identify player ship direction after 2 hits on the ship to allow computer targetted shots
function identifyPlayerHitShipDirection(id) {
  id = Number(id);
  for (let ship of playerShips) {
    if (ship.squares.includes(id) && ship.squaresHit.length === 2) {
      const result = ship.squaresHit[0] - ship.squaresHit[1];
      if (result === 1 || result === -1) {
        ship.direction = 1;
      } else {
        ship.direction = 2;
      }
    }
  }
}

// Function to set potential targets for the computer after 1 hit on a player ship
function setPlayerShipsPotentialTargets() {
  for (let ship of playerShips) {
    ship.potentialTargets = [];
    for (hit of ship.squaresHit) {
      if (ship.direction === 0) {
        if (
          hit + 1 < 100 &&
          hit % 10 < 9 &&
          (playerPositions[hit + 1] === "empty" ||
            playerPositions[hit + 1] === "ship")
        ) {
          ship.potentialTargets.push(hit + 1);
          compTargetedAvailableShots.push(hit + 1);
        }
        if (
          hit - 1 >= 0 &&
          hit % 10 > 0 &&
          (playerPositions[hit - 1] === "empty" ||
            playerPositions[hit - 1] === "ship")
        ) {
          ship.potentialTargets.push(hit - 1);
          compTargetedAvailableShots.push(hit - 1);
        }
        if (
          hit + 10 < 100 &&
          (playerPositions[hit + 10] === "empty" ||
            playerPositions[hit + 10] === "ship")
        ) {
          ship.potentialTargets.push(hit + 10);
          compTargetedAvailableShots.push(hit + 10);
        }
        if (
          hit - 10 >= 0 &&
          (playerPositions[hit - 10] === "empty" ||
            playerPositions[hit - 10] === "ship")
        ) {
          ship.potentialTargets.push(hit - 10);
          compTargetedAvailableShots.push(hit - 10);
        }
      }
      if (ship.direction === 1 && !ship.isSunk) {
        if (
          hit + 1 < 100 &&
          hit % 10 < 9 &&
          (playerPositions[hit + 1] === "empty" ||
            playerPositions[hit + 1] === "ship")
        ) {
          ship.potentialTargets.push(hit + 1);
          compTargetedAvailableShots.push(hit + 1);
        }
        if (
          hit - 1 >= 0 &&
          hit % 10 > 0 &&
          (playerPositions[hit - 1] === "empty" ||
            playerPositions[hit - 1] === "ship")
        ) {
          ship.potentialTargets.push(hit - 1);
          compTargetedAvailableShots.push(hit - 1);
        }
      }
      if (ship.direction === 2 && !ship.isSunk) {
        if (
          hit + 10 < 100 &&
          (playerPositions[hit + 10] === "empty" ||
            playerPositions[hit + 10] === "ship")
        ) {
          ship.potentialTargets.push(hit + 10);
          compTargetedAvailableShots.push(hit + 10);
        }
        if (
          hit - 10 >= 0 &&
          (playerPositions[hit - 10] === "empty" ||
            playerPositions[hit - 10] === "ship")
        ) {
          ship.potentialTargets.push(hit - 10);
          compTargetedAvailableShots.push(hit - 10);
        }
      }
    }
  }
}

// Function to check if a computer ship is sunk
function checkIfShipSunk() {
  for (let ship of compShips) {
    if (ship.squaresHit.length === ship.squares.length && !ship.isSunk) {
      ship.isSunk = true;
      message.textContent = "Ship SUNK!!";
      message.classList.remove("hide");
      setTimeout(function () {
        message.classList.add("hide");
      }, 500);
      for (let position of ship.squares) {
        compPositions[position] += " sunk";
      }
    }
  }
  drawCompGrid();
  checkIfPlayerWonGame();
}

// Function to check if a player ship is sunk
function checkIfPlayerShipSunk() {
  for (let ship of playerShips) {
    if (ship.squaresHit.length === ship.squares.length && !ship.isSunk) {
      ship.isSunk = true;
      message.textContent = "Ship SUNK!!";
      message.classList.remove("hide");
      setTimeout(function () {
        message.classList.add("hide");
      }, 500);
      compTargetedAvailableShots = [];
      currentCompAttackDirection = 0;
      for (let position of ship.squares) {
        playerPositions[position] += " sunk";
      }
    }
  }
  drawPlayerGrid();
  checkIfCompWonGame();
}

// Function to check if player has won the game
function checkIfPlayerWonGame() {
  let compShipsSunk = 0;
  for (let ship of compShips) {
    if (ship.isSunk) {
      compShipsSunk++;
    }
  }
  if (compShipsSunk === 5) {
    message.textContent = "Congratulations you won!!";
    compSection.classList.add("hide");
    playerSection.classList.add("hide");
    message.classList.remove("hide");
    playAgain.classList.remove("hide");
    compGrid.removeEventListener("click", clickCompGrid);
  } else {
    compTurn = true;
    setTimeout(function () {
      playerSection.classList.remove("hide");
      compSection.classList.add("hide");
      turn.textContent = "Computer Shot incoming...";
    }, 1500);
    setTimeout(compShot, 3000);
  }
}

// Function to check if computer has won the game
function checkIfCompWonGame() {
  let playerShipsSunk = 0;
  for (let ship of playerShips) {
    if (ship.isSunk) {
      playerShipsSunk++;
    }
  }
  if (playerShipsSunk === 5) {
    message.textContent = "Oh no, the computer won!!";
    compSection.classList.add("hide");
    playerSection.classList.add("hide");
    message.classList.remove("hide");
    playAgain.classList.remove("hide");
    compGrid.removeEventListener("click", clickCompGrid);
  } else {
    playerTurn = true;
    setTimeout(function () {
      playerSection.classList.add("hide");
      compSection.classList.remove("hide");
      turn.textContent = "Your turn";
      playerShot();
    }, 1500);
  }
}

// Event listener on the 'playAgain' button
playAgain.addEventListener("click", function () {
  message.classList.add("hide");
  playAgain.classList.add("hide");
  playerSection.classList.remove("hide");
  confirmPositions.classList.remove("hide");
  setupInstructions.classList.remove("hide");
  singleShipPosition = [];
  compShipPositions = [];
  playerShipPositions = [];
  compShips = [];
  playerShips = [];
  compAvailableShots = [];
  compTargetedAvailableShots = [];
  compHadPreviousHit = false;
  lastCompHit = null;
  currentCompAttackDirection = 0;
  compPositions = [];
  playerPositions = [];
  playerSelections = 0;
  setShips();
  setPlayerGridPositions();
  drawPlayerGrid();
  playerGrid.addEventListener("click", selectPlayerPositions);
});

// Event listener on the 'startGame' button
startGameBtn.addEventListener("click", function () {
  openingPage.classList.add("hide");
  playerSection.classList.remove("hide");
  confirmPositions.classList.remove("hide");
  setupInstructions.classList.remove("hide");
  setShips();
  setPlayerGridPositions();
  drawPlayerGrid();
});
