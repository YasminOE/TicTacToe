// game.js
export default function markersHandlers(playerX, playerO) {
  let currentPlayer = playerX || playerO;
  
  function drawMarkers() {
    const playerMarker = document.createElement('span');
    playerMarker.classList.add('material-symbols-outlined');
    
    if (currentPlayer === playerX) {
      playerMarker.classList.add('playerX');
      playerMarker.textContent = 'close';
    } else if (currentPlayer === playerO) {
      playerMarker.classList.add('playerO');
      playerMarker.textContent = 'radio_button_unchecked';
    }
    
    return playerMarker;
  }

  function switchPlayers() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    return currentPlayer;
  }

  function addMarkerToBoard(squares) {
    squares.forEach(square => {
      square.addEventListener("click", () => {
        if (!square.textContent) {
          square.appendChild(drawMarkers());
          switchPlayers(); // Switch players after a move
        } else {
          alert(`Error: the space you chose is already taken... try again`);
        }
      });
    });
  }

  return {
    drawMarkers,
    switchPlayers,
    addMarkerToBoard,
  };
}


