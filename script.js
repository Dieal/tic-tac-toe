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
        const cells = document.querySelectorAll(".cell");

        const getBoard = () => [...board];
        const getCell = index => board[index];
        const setCell = (index, value) => {
            if (board[index] !== null && board[index] !== undefined) return;
            board[index] = value;
        }
        const getCellList = () => cells;
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
            nextTurn(player);
        }

        return {getBoard, getCell, getCellList, setCell, isCellEmpty, resetBoard, updateBoard, markCell};
    })();

    const turnDisplay = document.getElementById("turn");
    const nextTurn = player => {
        if (selectedPlayer == null && selectedPlayer === undefined) {
            selectedPlayer = playerOne;
        } else {
            selectedPlayer = player == playerOne ? playerTwo : playerOne;
        }
        turnDisplay.textContent = `It's ${selectedPlayer.getPlayerName()}'s turn!`
    };

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
        
    const characterSelection = () => {

        const modal = document.querySelector("dialog.character-selection");
        modal.showModal();

        const form = modal.querySelector("form");
        form.addEventListener("submit", e => {
            e.preventDefault();
            const playerOneName = document.getElementById("characterOneName");
            const playerTwoName = document.getElementById("characterTwoName");
            playerOne = Player(playerOneName.value, 'X');
            playerTwo = Player(playerTwoName.value, 'O');
            modal.close();
            startGame();
        });

    };

    const startGame = () => {

        nextTurn();

        // DOM Board Cells
        gameboard.getCellList().forEach(cell => cell.onclick = e => {
            gameboard.markCell(e.currentTarget.dataset.index, selectedPlayer);
            gameboard.updateBoard();
        });

    };

    const restartGame = () => {
        gameboard.resetBoard();
        startGame();
    };

    return {characterSelection, restartGame};
})();


// Main flow
game.characterSelection();