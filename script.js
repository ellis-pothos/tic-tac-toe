// gameboard object
const gameBoard = {
    gameBoardArray: [0, 1, 2, 3, 4, 5, 6, 7, 8],
};

// CreatePlayer is a factory function??
function CreatePlayer (name, token) {
    this.name = name; 
    this.token = token; 
    return { name, token }; 
};

// gamePlay is object that controls the flow of the game itself 
const play = (function () {
    const move = (index, token) => {
        if (typeof gameBoard.gameBoardArray[index] === "number") {
            gameBoard.gameBoardArray.splice(index, 1, token);
        } else if (gameBoard.gameBoardArray[index] === "x" || gameBoard.gameBoardArray[index] === "o") {
            console.log("the same spot cannot be taken twice in one game");
        } else {
            console.log("ERROR");
        }
    };
        
    const checkWinner = (token) => {
        // checking vertical scores
        if (gameBoard.gameBoardArray[0] === token && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[3] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[6] 
            || gameBoard.gameBoardArray[1] === token && gameBoard.gameBoardArray[1] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[1] === gameBoard.gameBoardArray[7]
            || gameBoard.gameBoardArray[2] === token && gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[5] && gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[8]) {
            console.log("GAME OVER! " + token, " is the winner")
        // checking horizontal scores
        } else if (gameBoard.gameBoardArray[0] === token && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[1] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[2] 
            || gameBoard.gameBoardArray[3] === token && gameBoard.gameBoardArray[3] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[3] === gameBoard.gameBoardArray[5]
            || gameBoard.gameBoardArray[6] === token && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[7] && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[8]) {
            console.log("GAME OVER! " + token, " is the winner")
        // checking diagonal scores
        } else if (gameBoard.gameBoardArray[0] === token && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[8] 
            || gameBoard.gameBoardArray[6] === token && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[2]) { 
            console.log("GAME OVER! " + token, " is the winner")
        } else {
            console.log("no winner yet");
        }
    }; 
    return { move, checkWinner }; 
})(); 

// have to be able to match tokens with the name of the player

// game display
