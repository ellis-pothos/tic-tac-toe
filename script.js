// gameboard object
const gameBoard = {
    gameBoardArray: [0, 1, 2, 3, 4, 5, 6, 7, 8],
};

// CreatePlayer is a factory function??
const players = {
    gamePlayers: [],
    Player: function(name, token) {
        const addPlayer = () => players.gamePlayers.push({name, token});
        addPlayer();
        return { name, token}
    }
};

// gamePlay is object that controls the flow of the game itself 
const playGame = (function () {    

    const checkWinner = (token) => {
        // match tokens with the name of the player
        const winner = players.gamePlayers.find(createUser => createUser.token === token); 
        
        // checking vertical scores
        if (gameBoard.gameBoardArray[0] === token && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[3] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[6] 
            || gameBoard.gameBoardArray[1] === token && gameBoard.gameBoardArray[1] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[1] === gameBoard.gameBoardArray[7]
            || gameBoard.gameBoardArray[2] === token && gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[5] && gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[8]) {
            console.log("GAME OVER! " + winner.name + " is the winner")
        // checking horizontal scores
        } else if (gameBoard.gameBoardArray[0] === token && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[1] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[2] 
            || gameBoard.gameBoardArray[3] === token && gameBoard.gameBoardArray[3] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[3] === gameBoard.gameBoardArray[5]
            || gameBoard.gameBoardArray[6] === token && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[7] && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[8]) {
            console.log("GAME OVER! " + winner.name + " is the winner")
        // checking diagonal scores
        } else if (gameBoard.gameBoardArray[0] === token && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[8] 
            || gameBoard.gameBoardArray[6] === token && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[2]) { 
            console.log("GAME OVER! " + winner.name + " is the winner")
        } else {
            console.log("no winner yet");
        }
    }; 

    const move = (index, token) => {
        if (typeof gameBoard.gameBoardArray[index] === "number") {
            gameBoard.gameBoardArray.splice(index, 1, token);
            console.log(gameBoard.gameBoardArray)
            checkWinner(token);
        } else if (gameBoard.gameBoardArray[index] === "x" || gameBoard.gameBoardArray[index] === "o") {
            console.log("the same spot cannot be taken twice in one game");
        } else {
            console.log("ERROR");
        }
    };
    return { move, checkWinner }; 

})(); 

// game display
    // gameboardArray as a grid 
    // add a form for user input so players can give their names and select their tokens
        // (try having different, tokens? but the game logic only knows those tokens as being either X or O)
    // add a way to display the players in the game (i.e., the objects in players.gamePlayers),
        // and don't allow for more than two users at a time 
    // grid contains buttons that when clicked will call playGame.move(index, token)
    // add a way to display the console.log messages 
    // display scores so that players can go for best game out of three 
    // add a button to restart the game from 0 for each player
