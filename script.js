// gameboard module 
const gameBoard = {
    gameBoardArray: [0, 1, 2, 3, 4, 5, 6, 7, 8],
};

// players module
const players = {
    gamePlayers: [],

    updatePlayers: function() { 
        const player1 = players.gamePlayers[0];
        const player2 = players.gamePlayers[1];

        if (players.gamePlayers.length === 2) {
            player1Div.textContent = player1.name;
            player2Div.textContent = player2.name;
            gameMessages.textContent = "";
            arrow1.style.filter = `invert(100%)`;
        } else {
            gameMessages.textContent = "not enough players";
        }
    },

    Player: function(name) {
        let score = 0; 
        let whichPlayer = "";

        const addPlayer = () => 
            players.gamePlayers.push({name, score, whichPlayer})
            if (players.gamePlayers.length === 0) {
                whichPlayer = "player 1";
            } else if (players.gamePlayers.length === 1) {
                whichPlayer = "player 2";
            };
        addPlayer();
        players.updatePlayers();

        return { name, score, whichPlayer}
    },

    whoseTurn: "player 1",
    currentToken: "x",

    yourTurn: function() {        
        if (players.whoseTurn === "player 1") {
            players.whoseTurn = "player 2";
            arrow1.style.filter = `invert(0%)`;
            arrow2.style.filter = `invert(100%)`;
            players.currentToken = "o";

        } else if (players.whoseTurn === "player 2") {
            players.whoseTurn = "player 1";
            arrow1.style.filter = `invert(100%)`;
            arrow2.style.filter = `invert(0%)`;
            players.currentToken = "x";
        }
        console.log(players.whoseTurn + "'s turn")
        return players.whoseTurn
    },   
};

// game play module
const playGame = (function () {    
    const updateScore = () => {
        scores.textContent = players.gamePlayers[0].score + " vs. " + players.gamePlayers[1].score;
    };
    
    const checkWinner = (token) => {
        // match tokens with the name of the player
        
        const winner = players.gamePlayers.find(Player => Player.whichPlayer === players.whoseTurn); 
        
        // checking vertical scores
        if (gameBoard.gameBoardArray[0] === token && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[3] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[6] 
            || gameBoard.gameBoardArray[1] === token && gameBoard.gameBoardArray[1] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[1] === gameBoard.gameBoardArray[7]
            || gameBoard.gameBoardArray[2] === token && gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[5] && gameBoard.gameBoardArray[2] === gameBoard.gameBoardArray[8]) {
            gameMessages.textContent = "GAME OVER! " + winner.name + " is the winner";
            winner.score++; 
            updateScore(); 
        // checking horizontal scores
        } else if (gameBoard.gameBoardArray[0] === token && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[1] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[2] 
            || gameBoard.gameBoardArray[3] === token && gameBoard.gameBoardArray[3] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[3] === gameBoard.gameBoardArray[5]
            || gameBoard.gameBoardArray[6] === token && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[7] && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[8]) {
            gameMessages.textContent = "GAME OVER! " + winner.name + " is the winner";
                winner.score++;
            updateScore();  
        // checking diagonal scores
        } else if (gameBoard.gameBoardArray[0] === token && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[0] === gameBoard.gameBoardArray[8] 
            || gameBoard.gameBoardArray[6] === token && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[4] && gameBoard.gameBoardArray[6] === gameBoard.gameBoardArray[2]) { 
            gameMessages.textContent = "GAME OVER! " + winner.name + " is the winner";
                winner.score++; 
            updateScore(); 
        } else {
            console.log("no winner yet");
            players.yourTurn(); 
        }
    }; 

    const move = (index) => {
        if (typeof gameBoard.gameBoardArray[index] === "number") {
            gameBoard.gameBoardArray.splice(index, 1, players.currentToken);
            console.log(gameBoard.gameBoardArray)
            checkWinner(players.currentToken);
        } else if (gameBoard.gameBoardArray[index] === "x" || gameBoard.gameBoardArray[index] === "o") {
            gameMessages.textContent = "the same spot cannot be taken twice in one game";
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
        player1Div.textContent = "";
        gameDisplay.appendChild(player1Div);

        const gamePlayDisplay = document.createElement("div");
        gamePlayDisplay.classList.add("gameDisplayDiv");
        gameDisplay.appendChild(gamePlayDisplay);

            const leftArrow = document.createElement("div");
            leftArrow.classList.add("arrows");
                const arrow1 = document.createElement("img");
                arrow1.id = "leftArrow";
                arrow1.src = "arrow.svg";
                leftArrow.appendChild(arrow1);
            gamePlayDisplay.appendChild(leftArrow);

            const scores = document.createElement("div");
            scores.classList.add("scores");
            scores.textContent = " vs. ";
            gamePlayDisplay.appendChild(scores);

            const rightArrow = document.createElement("div");
            rightArrow.classList.add("arrows");
                const arrow2 = document.createElement("img");
                arrow2.id = "rightArrow";
                arrow2.src = "arrow.svg";
                rightArrow.appendChild(arrow2);
            gamePlayDisplay.appendChild(rightArrow);

        const player2Div = document.createElement("div");
        player2Div.classList.add("playerDisplay");
        player2Div.textContent = "";
        gameDisplay.appendChild(player2Div);
        
    const gameMessages = document.createElement("div");
    gameMessages.classList.add("gameMessages");
    gameMessages.textContent = "";
    container.appendChild(gameMessages);

// add a button to restart the game from 0 for each player
    const restartGame = document.createElement("button");
    restartGame.id = "restartGame";
    restartGame.textContent = "Restart all games"
    container.appendChild(restartGame); 

        restartGame.addEventListener(`click`) 

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
    // grid contains buttons that when clicked will call playGame.move(index)
