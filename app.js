const cell = document.querySelectorAll('.cell');
const playerDisplay = document.querySelector('.name');
const resetButton = document.querySelector('#reset');
const displayResult = document.querySelector('.result');

//using only 1 gameModule for the whole game
let gameModule = (() => {
    let currentPlayer = 'X';
    let isGameActive = true;
    let gameBoard = ['', '', '', '', '', '','', '', '',];
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8],
    ];

    const handlePlayerClick = (e) => {
        if(isGameActive && e.target.textContent === '') {
            e.target.textContent = currentPlayer;
            changeColor(e)
            updateBoard(e);
            displayWinner()
            changePlayer()
        } else {
            return false
        };
    };

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.textContent = currentPlayer;
    };

    const changeColor = (e) => {
        if(e.target.textContent === 'O') {
            e.target.style.color = 'orange';
        };
    };

    const updateBoard = (e) => {
        let cellId = e.target.id;
        gameBoard[cellId] = currentPlayer;
    };

    const displayWinner = () => {
        //looping through the winning conditions
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = gameBoard[winCondition[0]]; //get X O on subarray
            const b = gameBoard[winCondition[1]];
            const c = gameBoard[winCondition[2]];
            //the subarray contains 3 number, we'll check if it's been filled all
            if (a === '' || b === '' || c === '') {
                continue; //if not continue
            };
            if (a === b && b === c) {
                isGameActive = false;
                displayResult.textContent = `Player ${currentPlayer} won`;
            };
            if (!gameBoard.includes('') && a !== b && b !== c) {
                isGameActive = false;
                displayResult.textContent = 'Tie';
            };
        };
    };

    const resetBoard = () => {
        gameBoard = ['', '', '', '', '', '','', '', '',];
        isGameActive = true;
        currentPlayer = 'X';
        displayResult.textContent = ''
        cell.forEach((box) => {
            box.textContent = '';
            box.style = 'none';
        })
    }
    return {handlePlayerClick, resetBoard}
})();

cell.forEach((square) => {
    square.addEventListener('click', gameModule.handlePlayerClick);
});

resetButton.addEventListener('click', gameModule.resetBoard);

