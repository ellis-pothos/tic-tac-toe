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
    },
    whoseTurn: "player1",
    yourTurn: function() {        
        if (players.whoseTurn === "player1") {
            players.whoseTurn = "player2";
            return players.whoseTurn;
        } else if (players.whoseTurn === "player2") {
            players.whoseTurn = "player1";
            return players.whoseTurn;
        }
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
            players.yourTurn(); 
        } else if (gameBoard.gameBoardArray[index] === "x" || gameBoard.gameBoardArray[index] === "o") {
            console.log("the same spot cannot be taken twice in one game");
        } else {
            console.log("ERROR");
        }
    };
    return { move, checkWinner }; 

})(); 

// game display
const container = document.querySelector("#container");
container.classList.add("mainContainer"); 

    // display for whose turn it is
    const gameDisplay = document.createElement("div");
    gameDisplay.classList.add("gameDisplay");
    container.appendChild(gameDisplay);

        const player1Div = document.createElement("div");
        player1Div.classList.add("playerDisplay");
        player1Div.textContent = "PLAYER 1";
        gameDisplay.appendChild(player1Div);

        const gamePlayDisplay = document.createElement("div");
        gamePlayDisplay.classList.add("gameDisplayDiv");
        gameDisplay.appendChild(gamePlayDisplay);

            const leftArrow = document.createElement("div");
            leftArrow.classList.add("arrows");
            gamePlayDisplay.appendChild(leftArrow);

            const scores = document.createElement("div");
            scores.classList.add("arrows");
            gamePlayDisplay.appendChild(scores);

            const rightArrow = document.createElement("div");
            rightArrow.classList.add("arrows");
            gamePlayDisplay.appendChild(rightArrow);

        const player2Div = document.createElement("div");
        player2Div.classList.add("playerDisplay");
        player2Div.textContent = "PLAYER 2";
        gameDisplay.appendChild(player2Div);

    // gameboardArray as a grid 
    const gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer";
    container.appendChild(gridContainer);

        const button0 = document.createElement("button");
        button0.classList.add("gameButton"); 
        gridContainer.appendChild(button0);

        const button1 = document.createElement("button");
        button1.classList.add("gameButton"); 
        gridContainer.appendChild(button1);

        const button2 = document.createElement("button");
        button2.classList.add("gameButton"); 
        gridContainer.appendChild(button2);

        const button3 = document.createElement("button");
        button3.classList.add("gameButton"); 
        gridContainer.appendChild(button3);

        const button4 = document.createElement("button");
        button4.classList.add("gameButton"); 
        gridContainer.appendChild(button4);

        const button5 = document.createElement("button");
        button5.classList.add("gameButton"); 
        gridContainer.appendChild(button5);

        const button6 = document.createElement("button");
        button6.classList.add("gameButton"); 
        gridContainer.appendChild(button6);

        const button7 = document.createElement("button");
        button7.classList.add("gameButton"); 
        gridContainer.appendChild(button7);

        const button8 = document.createElement("button");
        button8.classList.add("gameButton"); 
        gridContainer.appendChild(button8);
    
    // add a form for user input so players can give their names and select their tokens
        // (try having different, tokens? but the game logic only knows those tokens as being either X or O)
    // add a way to display the players in the game (i.e., the objects in players.gamePlayers),
        // and don't allow for more than two users at a time 
    // grid contains buttons that when clicked will call playGame.move(index, token)
    // add a way to display the console.log messages 
    // display scores so that players can go for best game out of three 
    // add a button to restart the game from 0 for each player
