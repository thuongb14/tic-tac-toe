const cell = document.querySelectorAll('.cell');
const playerDisplay = document.querySelector('.name');
const resetButton = document.querySelector('#reset');


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
            changeColor(e)
            e.target.textContent = currentPlayer;
            changePlayer()
            // updateBoard(index)
        } else {
            return false
        }
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.textContent = currentPlayer;
    }

    // const updateBoard = (index) => {
    //     gameBoard(index)
    // }

    const changeColor = (e) => {
        if(currentPlayer === 'O') {
            e.target.style.color = 'orange';
        };
    }


    return {handlePlayerClick, changeColor}
})()
  

cell.forEach((square) => {
    square.addEventListener('click', gameModule.handlePlayerClick)
})









