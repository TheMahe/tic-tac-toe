const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;
const gameStatus = document.createElement('div');
gameStatus.className = 'game-info';
document.body.appendChild(gameStatus);
updateGameStatus();

cells.forEach(cell => {
    cell.addEventListener('click', cellClick, false);
});

function cellClick(event) {
    const cell = event.target;
    if (cell.textContent !== '' || !gameActive) {
        return;
    }
    cell.textContent = currentPlayer;
    cell.classList.add('taken');
    if (checkWin(currentPlayer)) {
        gameStatus.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus();
}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winConditions.some(condition => {
        return condition.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function updateGameStatus() {
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Optional: Add a reset button
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Game';
resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton);

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    currentPlayer = 'X';
    gameActive = true;
    updateGameStatus();
}
