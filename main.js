import createPlayer from './player.js';
import markersHandlers from './game.js';
import checkWinner from './winner.js';

const players = document.getElementsByTagName('input');
const start = document.getElementById('start');
const squares = document.querySelectorAll('.board-square button'); // Corrected selector

let round = 1;
let currentPlayer;

// Function to reset the game to its initial state
function restartGame() {
  // Clear the game board
  squares.forEach(square => {
    square.textContent = '';
  });
  // Reset round counter and current player
  round = 1;
  currentPlayer = playerX; // Make sure to update currentPlayer here
  trackingText.textContent = 'Currently Playing: No One';
}

const restartButton = document.getElementById('re-start');
restartButton.addEventListener('click', () => {
  restartGame();
});

start.addEventListener('click', () => {
  if (players[0].value === '' || players[1].value === '') {
    alert('ERROR: Players names are empty');
  } else {
    const playerX = createPlayer(players[0].value, "X");
    const playerO = createPlayer(players[1].value, "O");
    currentPlayer = playerX;

    console.log(playerX.playerInfo(), playerO.playerInfo());

    const playerMarkers = markersHandlers(playerX, playerO);

    // Add event listeners for each square using a for loop
    squares.forEach(square => {
      square.addEventListener('click', () => {
        const squareIndex = Array.from(squares).indexOf(square);
        const trackingText = document.getElementById('current-tracker-text');
        if (!square.textContent) {
          const markerElement = playerMarkers.drawMarkers();
          square.appendChild(markerElement);
          trackingText.textContent = `Currently Playing: ${currentPlayer.playerInfo().playerName}`;
          currentPlayer = playerMarkers.switchPlayers();
 


          const boardState = Array.from(squares).map(square => square.textContent);
          const winner = checkWinner(boardState);
          const text = document.getElementById('winner-text');
          if (winner !== null) {
            if (winner === 'Tie') {
              alert("It's a tie!");
            } else {
              const winningPlayer = winner === 'X' ? playerX : playerO;
              text.textContent = `Congratulation🎉 ${winningPlayer.playerInfo().playerName} You won!`;
              // squares.setAttribute('style', 'cursor: not-allowed');
              
              // Get the winning combination indices from your checkWinner function
              const winningCombination = getWinningCombinationIndices(boardState, winner);
        
              // Add a 'winning' class to the winning squares
              squares.forEach((square, index) => {
                if (winningCombination.includes(index)) {
                  square.parentElement.classList.add('winning');
                }
              });
            }
        
            console.log(`Rounds played: ${round}`);
            console.log(`Winner: ${winner}`);
            restartGame();
          } else {
            round++;
          }
        }
      });
    });
  }
});
