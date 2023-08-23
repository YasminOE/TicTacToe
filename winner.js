// winner.js
export default function checkWinner(board, markerX, markerO) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
  ];
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winner's marker ('X' or 'O')
    }
  }

  // If no winner and all spaces are filled, it's a tie
  if (!board.includes("")) {
    return 'Tie';
  }

  return null; // No winner yet
}
