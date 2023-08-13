// Constructors
const Player = (playerName, markSign) => {

    const getPlayerName = () => playerName;
    const getMarkSign = () => markSign;

    return {getPlayerName, getMarkSign};
}

const game = (() => {

    let playerOne;
    let playerTwo;
    let selectedPlayer;

    const gameboard = (() => {
        let board = [];

        const getBoard = () => [...board];
        const getCell = index => board[index];
        const setCell = (index, value) => {
            if (board[index] !== null && board[index] !== undefined) return;
            board[index] = value;
        }
        const resetBoard = () => board = [];
        const updateBoard = () => {
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null || board[i] === undefined) continue;
                cells[i].textContent = board[i];
            } 
        };
        const isCellEmpty = index => board[index] === null || board[index] === undefined;
        const markCell = function (index, player) {
            this.setCell(index, player.getMarkSign().toUpperCase());
        }

        return {getBoard, getCell, setCell, isCellEmpty, resetBoard, updateBoard, markCell};
    })();

    // DOM Board Cells
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.onclick = e => {
        gameboard.markCell(e.currentTarget.dataset.index, selectedPlayer);
        gameboard.updateBoard();
        console.log(checkWin());
    });

    // Returns: 'X' if x wins, 'O' if o wins, '' if the game hasn't ended, 'draw' if draw
    const checkWin = () => {

        const board = gameboard.getBoard();
        const filteredBoard = board.filter(mark => mark !== null && mark !== undefined);

        // In order to win, there must be at least 4 ticks on the grid.
        if (filteredBoard.length < 5) return '';

        let result = '';

        // Check for row wins
        for (let i = 1; i <= 7; i += 3) {
            if (gameboard.isCellEmpty(i)) continue;
            let char = board[i];
            if ((board[i - 1] === char) && (char === board[i + 1])) {
                return char;    
            }
        }

        // Check for column wins
        for (let i = 0; i < 3; i++) {
            if (gameboard.isCellEmpty(i)) continue;
            let char = board[i];
            if (char === board[i + 3] && char === board[i + 6]) return char;
        }

        // Check for diagonal wins
        for (let i = 0; i < 3; i += 2) {
            if (gameboard.isCellEmpty(i)) continue;
            let char = board[i];
            
            // 4 is the index of the central cell
            if (char === board[4]) {
                if ((i === 0 && board[8] === char) || (i === 2 && board[6] === char)) {
                    return char;
                }
            } 
        }

        // Check if draw or no one has won yet
        if (filteredBoard.length === 9) return 'draw';

        return '';

    };
        
    const startGame = () => {
        playerOne = Player("Guest 1", 'X');
        playerTwo = Player("Guest 2", 'O');
        selectedPlayer = playerOne;
    };

    return {startGame};
})();


// Main flow
game.startGame();