// Constructors
const Player = (markSign) => {

    const getMarkSign = () => markSign;
    const markCell = () => {
        //
    };

    return {getMarkSign};
}

const game = (() => {

    let playerOne;
    let playerTwo;
    const gameboard = (() => {
        let board = ['X', 'O', 'X', 'X'];

        const getBoard = () => board;
        const resetBoard = () => board = [];
        const updateBoard = () => {
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null || board[i] === undefined) continue;
                cells[i].textContent = board[i];
            } 
        };

        return {getBoard, resetBoard, updateBoard};
    })();

    // DOM Board Cells
    const cells = document.querySelectorAll(".cell");
    cells.forEach(e => e.onclick = () => {
        // DOM interaction
    });
        
    const startGame = () => {
        playerOne = Player('X');
        playerTwo = Player('O');
        gameboard.resetBoard();
    };

    return {startGame};
})();


// Main flow
game.startGame();
