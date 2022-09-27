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
                      [4,'b', 4, 'violet'], 
                      [5,'C', 5, 'orange']
                    ];
    let currP = 0;
    let currBlock = gamePiece[currP];
    let gameReady = false;
    let gameData = [];
    let gameState = [];
    let blocksPlaced = 0;
    const blockHolder = () =>{
        const blockHolder = document.createElement('div');
        blockHolder.classList.add('block-holder');

        const rotateBtn = document.createElement('button');
        rotateBtn.classList.add('rotate-btn');
        rotateBtn.onclick = ()=>{
            orientation = !orientation;
        }

        const clearBtn = document.createElement('button');
        clearBtn.setAttribute('type', 'button');
        clearBtn.classList.add('clear-btn');
        clearBtn.onclick = ()=>{
            const playBtn = document.querySelector('.play-btn');
            playBtn.classList.remove('game-ready');
            gameReady = false;
            blocksPlaced = 0;
            currP = 0;
            currBlock = gamePiece[currP];
            for(let i = 0; i < 7; i++){
                for(let j = 0; j < 7; j++){
                    gameState[i][j][0] = 0;
                    gameState[i][j][2] = 0;
                    gameState[i][j][3] = 0;
                    gameState[i][j][1].style.backgroundColor = '';
                    gameState[i][j][1].style.opacity = '30%';
                    gameData[i][j] = 0;  
                }
            }
        
        }

        const gameStartBtn = document.createElement('button');
        gameStartBtn.classList.add('play-btn');
        gameStartBtn.textContent = 'play';
        gameStartBtn.onclick = () => {
            if(!gameReady){
                console.log('game not ready');
            }else{
                console.log('game ready', gameData);
            }
        }

        
        blockHolder.appendChild(rotateBtn);
        blockHolder.appendChild(clearBtn);
        blockHolder.appendChild(gameStartBtn);
        return blockHolder;
    }

    const placeGameBoard = () =>{
        const newGameboard = document.createElement('div');
        newGameboard.classList.add('game-board')
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
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1].style.opacity = '30%';
                    }
                }
            }else{
                if(pieceAvailable){
                    for(let i = 0; i < piece ; i++){
                        let color = 'rgb(0, 0, 0)';
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1].style.backgroundColor = color;
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1].style.opacity = '30%';
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
                const playBtn = document.querySelector('.play-btn');
                playBtn.classList.remove('game-ready');
                orientation = gameState[y][x][3];
                gameReady = false;
                editOn = true;
                blocksPlaced--;
                let tokenChecker = gameState[y][x][0];
                currBlock = gamePiece[tokenChecker - 1];
                for(let i = 0; i < 7; i++){
                    for(let j = 0; j < 7; j++){
                        if(gameState[i][j][0] == tokenChecker){    
                            gameState[i][j][0] = 0;
                            gameState[i][j][2] = 0;
                            gameState[i][j][1].style.backgroundColor = '';
                            gameState[i][j][1].style.opacity = '30%';
                            gameData[i][j] = 0;   
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
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1].style.backgroundColor = color;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1].style.opacity = '100%';
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0] = token;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][2] = piece;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][3] = orientation;
                    
                    gameData[y + (orientation?i:0)] [x + (orientation?0:i)] = token;
                }
                
                //am idiot
                const playBtn = document.querySelector('.play-btn');
                if (currP <4||blocksPlaced < 4){
                    if(editOn == false){
                        currP++;   
                    }
                    gameReady = false;
                    playBtn.classList.remove('game-ready');
                }else{
                    playBtn.classList.add('game-ready');
                    gameReady = true;
                }
                blocksPlaced++;
                editOn = false;
                currBlock = gameReady?0:gamePiece[currP];
            }
            
            
        }
    
        return newGameboard;
    }
    
    //replace content

    
    newGame.appendChild(placeGameBoard());
    newGame.appendChild(blockHolder());
    return newGame;
}
//animated list
const animatedList = () =>{
    const animatedList = document.createElement('ul');
    animatedList.classList.add('shapes');
    function getRandomInt(max, floor) {
        return Math.floor(Math.random() * max + floor);
      }
    for(let i = 0; i<100; i++){
        const shapeDiv = document.createElement('li');
        shapeDiv.style.left = getRandomInt(95, 0)+'vw';
        shapeDiv.style.top = getRandomInt(80, 10)+'vh';
        shapeDiv.style.width = shapeDiv.style.height = getRandomInt(5, 1)+'vmin';
        shapeDiv.style.animationDuration = getRandomInt(10,2)+'s';
        animatedList.appendChild(shapeDiv);

    }
    return animatedList;
}
//document.body.appendChild(animatedList());

const placeContent = (content) =>{
    const currContent = document.querySelector('.content');

    while(currContent.hasChildNodes()){
        currContent.removeChild(currContent.lastChild);
    }

    currContent.appendChild(content);
}


placeContent(newGame());