//new game
const newGame = () =>{
    const newGame = document.createElement('div');
    newGame.classList.add('new-game');
    
    //0 for horizontal, 1 for vertical
    let orientation = 1;
    // d = destroyer, s = submarine, cruiser = c, b = battleship, C = carrier
    let gamePiece = [ [1,'d', 2, 'blue'],
                      [2,'s', 3, 'yellow'], 
                      [3,'c', 3, 'red'], 
                      [4,'b', 4, 'violet'], 
                      [5,'C', 5, 'orange']
                    ];
    //data markers
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
                    gameState[i][j][1] = 0;
                    gameState[i][j][2] = 0;
                    gameState[i][j][0].style.backgroundColor = '';
                    gameState[i][j][0].style.opacity = '30%';
                    gameData[i][j] = 0;  
                }
            }
        
        }

        const gameStartBtn = document.createElement('button');
        gameStartBtn.classList.add('play-btn');
        gameStartBtn.textContent = 'play';
        gameStartBtn.onclick = () => {
            if(!gameReady){
                console.log('game not ready', gameData);
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
            let tempStateArray = [];
            let tempDataArray = [];
            for(let x = 0; x < 7; x++){
                const gamePixel = document.createElement('div');
                gamePixel.classList.add('game-pixel');
                tempDataArray.push(0);
                //div block, token, orientation
                tempStateArray.push([gamePixel ,0 ,0]);
    
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
            gameState.push(tempStateArray);
            
        }
        //check if piece is available
        function pieceAvailable(y, x, piece){
            for(let i = 0; i<piece; i++){
                if (orientation && gameState[y+i]==null){
                        return false;
                }else if (!orientation && gameState[x+i]==null){
                    return false; 
                }
                if(gameData[y + (orientation?i:0)] [x + (orientation?0:i)] != 0){
                    return false;
                }
            }
            return true;
        }
        //highlights piece
        function pixelHighlight(y, x, active, cB){
            let color = cB[3]
            let piece = cB[2];
            if(active){
                if(pieceAvailable(y, x, piece)){
                    for(let i = 0; i< piece; i++){    
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0].style.backgroundColor = color;
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0].style.opacity = '30%';
                    }
                }
            }else{
                if(pieceAvailable(y, x, piece)){
                    for(let i = 0; i < piece ; i++){
                        let color = 'rgb(0, 0, 0)';
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0].style.backgroundColor = color;
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0].style.opacity = '30%';
                    }
                }
            }

        }
        let editOn = false;
        function pixelClick(y, x, cB){
            let token = cB[0];
            let piece = cB[2];
            let color = cB[3];
            
            if(gameData[y][x] != 0 && !editOn){
                blocksPlaced--;
                editOn = true;
                let tokenChanger = gameData[y][x];
                currBlock = gamePiece[tokenChanger - 1];
                for(let i = 0; i < 7; i++){
                    for(let j = 0; j < 7; j++){
                        if(gameState[i][j][1] == tokenChanger){
                            gameState[i][j][1] = 0;
                            orientation = gameState[i][j][2];
                            gameState[i][j][2] = 0;
                            gameState[i][j][0].style.backgroundColor = '';
                            gameState[i][j][0].style.opacity = '30%';
                            gameData[i][j] = 0; 
                        }

                    }
                }
            }else if(pieceAvailable(y, x, piece) && blocksPlaced <=4){
                //places block
                for(let i = 0; i< piece; i++){    
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0].style.backgroundColor = color;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0].style.opacity = '100%';
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1] = token;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][2] = orientation;

                    gameData[y + (orientation?i:0)] [x + (orientation?0:i)] = token;
                       
                }
                if(currP < 4){
                    
                    if(!editOn){
                        currP++; 
                    }
                    
                    gameReady = false;
                }else{
                    gameReady = true;
                }
                blocksPlaced++;
                currBlock = gameReady?0:gamePiece[currP];
                editOn = false;
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