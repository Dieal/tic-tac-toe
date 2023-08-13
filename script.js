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
        const markCell = (index, player) => {
            this.setCell(index, player.getMarkSign.toUpperCase());
        }

        return {getBoard, getCell, setCell, isCellEmpty, resetBoard, updateBoard, markCell};
    })();

    // DOM Board Cells
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.onclick = e => {
        gameboard.markCell(e.currentTarget.dataset.index, selectedPlayer);
        gameboard.updateBoard();
    });
        
    const startGame = () => {
        playerOne = Player("Guest 1", 'X');
        playerTwo = Player("Guest 2", 'O');
        gameboard.resetBoard();
        selectedPlayer = playerOne;
    };

    return {startGame};
})();


// Main flow
game.startGame();