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
            players.whoGoesFirst();

            if (players.whoseTurn === "player 1") {
                highlightArrow(arrow1);
                // arrow1.style.filter = `invert(100%)`;
                // arrow2.style.filter = `invert(0%)`;
            } else if (players.whoseTurn === "player 2") {
                highlightArrow(arrow2);
                // arrow1.style.filter = `invert(0%)`;
                // arrow2.style.filter = `invert(100%)`;
            }
        } else if (players.gamePlayers.length < 2) {
            gameMessages.textContent = "not enough players";
        } else {
            gameMessages.textContent = "you cannot have more than two players";
            players.gamePlayers.length = 2; 
        }
    },

    Player: function(input) {
        let name = input.value;       
        let score = 0; 

        let whichPlayer = players.gamePlayers.length === 0 ? "player 1" : "player 2";
            
        const addPlayer = () => 
            players.gamePlayers.push({name, score, whichPlayer});

        addPlayer();
        players.updatePlayers();

        return { name, score }
    },

    whoGoesFirst: function() {
        let x = Math.floor(Math.random() * 2);
        console.log(x);
        players.whoseTurn = x === 0 ? "player 1" : "player 2";
        players.currentToken = players.whoseTurn === "player 1" ? "x" : "o";
        alert("The first player has been randomly chosen!");
        return players.whoseTurn, players.currentToken
    },

    whoseTurn: "",
    currentToken: "",

    yourTurn: function() {        
        if (players.whoseTurn === "player 1") {
            players.whoseTurn = "player 2";
            highlightArrow(arrow1);
            highlightArrow(arrow2);
            // arrow1.style.filter = `invert(0%)`;
            // arrow2.style.filter = `invert(100%)`;
            players.currentToken = "o";

        } else if (players.whoseTurn === "player 2") {
            players.whoseTurn = "player 1";
            highlightArrow(arrow1);
            highlightArrow(arrow2);
            // arrow1.style.filter = `invert(100%)`;
            // arrow2.style.filter = `invert(0%)`;
            players.currentToken = "x";
        }
        console.log(players.whoseTurn + "'s turn")
        return players.whoseTurn
    },   
};

// game play module
const playGame = (function () {    
    const newGame = () => {
        gameBoard.gameBoardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        console.log(gameBoard.gameBoardArray);
        gameButtons.forEach(button => {
            button.style.backgroundColor = '';
        });
        if (players.whoseTurn === "player 1") {
            highlightArrow(arrow1);
            // arrow1.style.filter = `invert(100%)`;
            // arrow2.style.filter = `invert(0%)`;
        } else if (players.whoseTurn === "player 2") {
            highlightArrow(arrow2);
            // arrow1.style.filter = `invert(0%)`;
            // arrow2.style.filter = `invert(100%)`;
        };
        players.updatePlayers();
        // players.whoGoesFirst();
    };

    const resetMatch = () => {
        players.gamePlayers[0].score = 0;
        players.gamePlayers[1].score = 0;
        playGame.updateScore();
        playGame.newGame();
    }

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
    return { move, checkWinner, updateScore, newGame, resetMatch }; 
})(); 

// game display
const container = document.querySelector("#container");
container.classList.add("mainContainer"); 

    const playersFormContainer = document.createElement("div");
    playersFormContainer.id = "playersFormContainer";
    container.appendChild(playersFormContainer);

        const playersFormButton = document.createElement("button");
        playersFormButton.id = "playersFormButton";
        playersFormButton.textContent = "Enter players";
        playersFormContainer.appendChild(playersFormButton);

            const dialog = document.createElement("dialog");
            playersFormContainer.appendChild(dialog);

                const playersForm = document.createElement("form");
                playersForm.id = "playersForm";

                const player1Input = document.createElement("input");
                player1Input.type = "text";
                player1Input.name = "player 1 name";
                player1Input.placeholder = "Enter first player's name";

                const player2Input = document.createElement("input");
                player2Input.type = "text";
                player2Input.name = "player 2 name";
                player2Input.placeholder = "Enter second player's name";
                
                const submitButton = document.createElement('button');
                submitButton.type = "button";
                submitButton.textContent = "Submit";

                    submitButton.addEventListener(`click`, () => {
                        if (players.gamePlayers.length === 0) {
                            const firstPlayer = players.Player(player1Input);
                            const secondPlayer = players.Player(player2Input);
                            dialog.close();
                            return firstPlayer, secondPlayer;
                        } else {
                            players.gamePlayers.length = 0;
                            const firstPlayer = players.Player(player1Input);
                            const secondPlayer = players.Player(player2Input);
                            dialog.close();
                            return firstPlayer, secondPlayer;
                        }
                    })

                playersForm.appendChild(player1Input);
                playersForm.appendChild(player2Input);
                playersForm.appendChild(submitButton);

            dialog.appendChild(playersForm);

        playersFormButton.addEventListener(`click`, () => {
            dialog.showModal();
        });
    

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
                arrow1.src = "arrow.png";
                leftArrow.appendChild(arrow1);
            gamePlayDisplay.appendChild(leftArrow);

            const scores = document.createElement("div");
            scores.classList.add("scores");
            scores.textContent = "0 vs. 0";
            gamePlayDisplay.appendChild(scores);

            const rightArrow = document.createElement("div");
            rightArrow.classList.add("arrows");
                const arrow2 = document.createElement("img");
                arrow2.id = "rightArrow";
                arrow2.src = "arrow.png";
                rightArrow.appendChild(arrow2);
            gamePlayDisplay.appendChild(rightArrow);

            const highlightArrow = function(arrow) {
                arrow.classList.toggle("arrowOn");
            }
        
            const player2Div = document.createElement("div");
        player2Div.classList.add("playerDisplay");
        player2Div.textContent = "";
        gameDisplay.appendChild(player2Div);
        
    const gameMessages = document.createElement("div");
    gameMessages.classList.add("gameMessages");
    gameMessages.textContent = "";
    container.appendChild(gameMessages);

// add a button to restart the game from 0 for each player
    const newGameContainer = document.createElement("div");
    newGameContainer.classList.add("newGameContainer");
    container.appendChild(newGameContainer);

        const newGameButton = document.createElement("button");
        newGameButton.id = "newGameButton";
        newGameButton.textContent = "New game"; 
            newGameButton.addEventListener(`click`, () => {
                playGame.newGame();
            })
        newGameContainer.appendChild(newGameButton);

        const restartGame = document.createElement("button");
        restartGame.id = "restartGame";
        restartGame.textContent = "Restart the match";
        newGameContainer.appendChild(restartGame); 

            restartGame.addEventListener(`click`, () => {
                playGame.resetMatch();
            }) 

    // gameboardArray as a grid 
    const gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer";
    container.appendChild(gridContainer);

        const button0 = document.createElement("button");
        button0.classList.add("gameButton"); 
        button0.data = {
            index: 0,
        }
        gridContainer.appendChild(button0);

        const button1 = document.createElement("button");
        button1.classList.add("gameButton"); 
        button1.data = {
            index: 1,
        }
        gridContainer.appendChild(button1);

        const button2 = document.createElement("button");
        button2.classList.add("gameButton"); 
        button2.data = {
            index: 2,
        }
        gridContainer.appendChild(button2);

        const button3 = document.createElement("button");
        button3.classList.add("gameButton"); 
        button3.data = {
            index: 3,
        }
        gridContainer.appendChild(button3);

        const button4 = document.createElement("button");
        button4.classList.add("gameButton"); 
        button4.data = {
            index: 4,
        }
        gridContainer.appendChild(button4);

        const button5 = document.createElement("button");
        button5.classList.add("gameButton"); 
        button5.data = {
            index: 5,
        }
        gridContainer.appendChild(button5);

        const button6 = document.createElement("button");
        button6.classList.add("gameButton"); 
        button6.data = {
            index: 6,
        }
        gridContainer.appendChild(button6);

        const button7 = document.createElement("button");
        button7.classList.add("gameButton"); 
        button7.data = {
            index: 7,
        }
        gridContainer.appendChild(button7);

        const button8 = document.createElement("button");
        button8.classList.add("gameButton"); 
        button8.data = {
            index: 8,
        }
        gridContainer.appendChild(button8);

        const gameButtons = document.querySelectorAll('.gameButton'); 
        gameButtons.forEach(button => {
            button.addEventListener(`click`, () => {
                let where = button.data.index;
                if (players.whoseTurn === "player 1") {
                    button.style.backgroundColor = "black";
                    playGame.move(where);
                } else if (players.whoseTurn === "player 2") {
                    button.style.backgroundColor = "grey";
                    playGame.move(where);
                }
            })
        })
    
    // add a form for user input so players can give their names and select their tokens
        // (try having different, tokens? but the game logic only knows those tokens as being either X or O)
    // grid contains buttons that when clicked will call playGame.move(index)
