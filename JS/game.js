function resetGameStatus() {
    activePlayer = 0;
    gameRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML ='You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';
    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
    
}
function startNewGame() {
    if (players[0].name === '' || players[1].name === '') {
      alert('Please set custom player names for both players!');
      return;
    }
    
    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
  }
  
  function switchPlayer() {
    if (activePlayer === 0) {
      activePlayer = 1;
    } else {
      activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
  }
  
  function selectGameField(event) {
    if (event.target.tagName !== 'LI' || gameIsOver) {
      return;
    }
  
    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;
  
    if (gameData[selectedRow][selectedColumn] > 0) {
      alert('Please select an empty field!');
      return;
    }
  
    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add('disabled');
  
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    console.log(gameData);
  
    const winnerId = checkForGameOver();
      if (winnerId !== 0) {
          gameOver(winnerId);
    }
    gameRound++;
    console.log(gameRound);
    switchPlayer();
}
  
function checkForGameOver() {
    //check for rows equalitiy
    for (let i = 0; i < 3; i++){
        if ( 
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]   
        ) {
            return gameData[i][0];
        }
    }
    //check for column equalitiy

    for (let i = 0; i < 3; i++){
        if ( 
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]   
        ) {
            return gameData[0][i];
        }
    }
    

    //check for left top right bottom
    if (
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }

    //check for right top left bottom

    if (
        gameData[0][2] > 0 &&
        gameData[0][2] === gameData[1][1] &&
        gameData[1][1] === gameData[2][0]
    ) {
        return gameData[0][2];
    }

    if (gameRound === 9)
    {
        console.log("9 is there...!");
        return -1;

    }

    return 0;
}

function gameOver(winnerId) {
    
    gameIsOver = true;
    gameOverElement.style.display = 'block';

    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    }
    else {
        gameOverElement.style.display = 'block';
        gameOverElement.firstElementChild.textContent = 'It\'s a Draw!';
    }
    
}
  