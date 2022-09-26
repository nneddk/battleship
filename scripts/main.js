//new game
const newGame = () =>{
    const newGame = document.createElement('div');
    newGame.classList.add('new-game');
    
    //1 for vertical, 0 for horizontal
    let orientation = 1;
    // d = destroyer, s = submarine, cruiser = c, b = battleship, C = carrier
    let gamePiece = [ [1,'d', 2, 'blue'],
                      [2,'s', 3, 'yellow'], 
                      [3,'c', 3, 'red'], 
                      [4,'b', 4, 'purple'], 
                      [5,'C', 5, 'orange']
                    ];
    let currP = 0;
    let currBlock = gamePiece[currP];
    let gameReady = false;
    let gameData = [];
    let blocksPlaced = 0;
    const blockHolder = () =>{
        const blockHolder = document.createElement('div');
        blockHolder.classList.add('block-holder');

        const rotateBtn = document.createElement('button');
        rotateBtn.classList.add('rotate-btn');
        rotateBtn.textContent = 'rotate';
        rotateBtn.onclick = ()=>{
            orientation = !orientation;
        }

        const gameStartBtn = document.createElement('button');
        gameStartBtn.classList.add('game-start-btn');
        gameStartBtn.textContent = 'start game';
        gameStartBtn.onclick = () => {
            if(!gameReady){
                console.log('game not ready');
            }else{
                console.log('game ready', gameData);
            }
        }

        
        blockHolder.appendChild(rotateBtn);
        blockHolder.appendChild(gameStartBtn);
        return blockHolder;
    }

    const placeGameBoard = () =>{
        const newGameboard = document.createElement('div');
        newGameboard.classList.add('game-board')
        let gameState = [];
        for(let y = 0; y < 7; y++){
            let tempArray = [];
            let tempDataArray = [];
            for(let x = 0; x < 7; x++){
                const gamePixel = document.createElement('div');
                gamePixel.classList.add('game-pixel');
                tempDataArray.push(0),
                tempArray.push([0, gamePixel, 0, 0]);
    
                gamePixel.onmouseover =()=>{
                    pixelHighlight(y, x, true, currBlock);
                }
                gamePixel.onmouseleave = () =>{
                    pixelHighlight(y, x, false, currBlock);
                }

                gamePixel.onclick =()=>{
                    pixelClick(y, x, currBlock);
                    
                }
                newGameboard.appendChild(gamePixel);
            }
            gameData.push(tempDataArray);
            gameState.push(tempArray);
            
        }
        
        function pixelHighlight(y, x, active, cB){
            let color = cB[3]
            let piece = cB[2];

            let pieceAvailable = true;
    
            for(let i = 0; i<piece; i++){
                if (gameState[y + i] == null && orientation){
                    pieceAvailable = false;
                }else if (gameState[y + (orientation?i:0)] [x + (orientation?0:i)] == null){
                    pieceAvailable = false;
                }else if(gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0] != 0){
                    pieceAvailable = false;
                }
                
            }
            if(active){
                if(pieceAvailable){
                    for(let i = 0; i< piece; i++){
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1].style.backgroundColor = color;
                    }
                }
            }else{
                if(pieceAvailable){
                    for(let i = 0; i < piece ; i++){
                        let color = '';
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1].style.backgroundColor = color;
                    }
                }
            }

        }
        let editOn = false;
        
        function pixelClick(y, x, cB){
            let pieceAvailable = true;
            let color = cB[3]
            let piece = cB[2];
            let token = cB[0];
            
            if(gameState[y][x][0] != 0 && !editOn){
                editOn = true;
                blocksPlaced--;
                let tokenChecker = gameState[y][x][0];
                for(let i = 0; i < 7; i++){
                    for(let j = 0; j < 7; j++){
                        if(gameState[i][j][0] == tokenChecker){
                            currBlock = gamePiece[tokenChecker - 1];
                            gameState[i][j][0] = 0;
                            gameState[i][j][2] = 0;
                            gameState[i][j][1].classList.remove(color);
                            gameState[i][j][1].style.backgroundColor = '';
                            orientation = gameState[i][j][3];
                            gameData[i][j] = 0;
                            gameReady = false;
                            
                        }
                    }
                }
                pieceAvailable = false;
            }

            for(let i = 0; i<piece; i++){
                if (gameState[y + i]==null && orientation){
                    pieceAvailable = false;
                }else if (gameState[y + (orientation?i:0)] [x + (orientation?0:i)] == null){
                    pieceAvailable = false;
                }else if(gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0] != 0){
                    pieceAvailable = false;
                }
                
            }
            if(pieceAvailable){
                for(let i = 0; i< piece; i++){
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1].classList.add(color);
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0] = token;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][2] = piece;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][3] = orientation;
                    
                    gameData[y + (orientation?i:0)] [x + (orientation?0:i)] = token;
                }
                
                //am idiot
                if (currP <4||blocksPlaced < 4){
                    if(editOn == false){
                        currP++;   
                    }
                    gameReady = false;
                }else{
                    gameReady = true;
                }
                blocksPlaced++;
                editOn = false;
                console.log(currP);
                currBlock = gameReady?0:gamePiece[currP];
            }
            
            
        }
    
        return newGameboard;
    }
    
    //replace content

    newGame.appendChild(blockHolder());
    newGame.appendChild(placeGameBoard());

    return newGame;
}

const placeContent = (content) =>{
    const currContent = document.querySelector('.content');

    while(currContent.hasChildNodes()){
        currContent.removeChild(currContent.lastChild);
    }

    currContent.appendChild(content);
}


placeContent(newGame());