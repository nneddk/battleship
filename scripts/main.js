const newGame = () =>{
    const newGame = document.createElement('div');
    newGame.classList.add('new-game');
    let currBlock = 0;
    //1 for vertical, 0 for horizontal
    let orientation = 1;
    // d = destroyer, s = submarine, cruiser = c, b = battleship, C = carrier
    let gamePiece = [ [1,'d', 2, 'blue'],
                      [2,'s', 3, 'yellow'], 
                      [3,'c', 3, 'red'], 
                      [4,'b', 4, 'purple'], 
                      [5,'C', 5, 'orange']
                    ];

    const blockHolder = () =>{
        const blockHolder = document.createElement('div');
        blockHolder.classList.add('block-holder');
        
        const blockHolderHeader = document.createElement('div');
        blockHolderHeader.classList.add('block-holder-header');
        blockHolderHeader.textContent = 'Blocks:';

        const blockHolderHolder = document.createElement('div');
        blockHolderHolder.classList.add('block-holder-holder');
        
        for (let i = 0; i <5; i++){
            const blockDiv = document.createElement('button');
            blockDiv.classList.add(gamePiece[i][1]);
            blockDiv.classList.add('block');
            blockDiv.textContent = gamePiece[i][1];

            blockDiv.onclick = () =>{
                currBlock = gamePiece[i];
                console.log(currBlock[2]);
            }

            blockHolderHolder.appendChild(blockDiv);
        }
        
        blockHolder.appendChild(blockHolderHeader);
        blockHolder.appendChild(blockHolderHolder);
        return blockHolder;
    }
    
    const placeGameBoard = () =>{
        const newGameboard = document.createElement('div');
        newGameboard.classList.add('game-board')
        
        let gameState = [[0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         
        ];
        
        for(let y = 0; y < 7; y++){
            for(let x = 0; x < 7; x++){
                const gamePixel = document.createElement('div');
                gamePixel.classList.add('game-pixel')
                gameState[y][x] = [0, gamePixel];
    
                gamePixel.onmouseover =()=>{
                    pixelHighlight(y, x, true, currBlock);
                }
                gamePixel.onmouseleave = () =>{
                    pixelHighlight(y, x, false, currBlock);
                }

                gamePixel.onclick =()=>{
                    pixelClick(y, x, currBlock);
                    console.log(gameState);
                    
                }
                
                /*
               gamePixel.onmouseover = () =>{
                console.log(coords);
               }
               */
                newGameboard.appendChild(gamePixel);
            }
        }
        function pixelHighlight(y, x, active, cB){
            let color = cB[3]
            let piece = cB[2];

            let pieceAvailable = true;
    
            for(let i = 0; i<piece; i++){
                if (gameState[y + i]==null && orientation){
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
        function pixelClick(y, x, cB){
            let pieceAvailable = true;
            let color = cB[3]
            let piece = cB[2];
    
            for(let i = 0; i<piece; i++){
                if (gameState[y + i]==null && orientation){
                    pieceAvailable = false;
                }else if (gameState[y + (orientation?i:0)] [x + (orientation?0:i)] == null){
                    pieceAvailable = false;
                }else if(gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0] != 0){
                    pieceAvailable = false;
                }
                
            }
            console.log(pieceAvailable);
            if(pieceAvailable){
                for(let i = 0; i< piece; i++){
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1].style.backgroundColor = color;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0] = piece;
                }
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