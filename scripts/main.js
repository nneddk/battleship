//new game
const newGame = () =>{
    const newGame = document.createElement('div');
    newGame.classList.add('new-game');
    
    //0 for horizontal, 1 for vertical
    let orientation = 1;
    // d = destroyer, s = submarine, cruiser = c, b = battleship, C = carrier
    let gamePiece = [ [1,'d', 2, 'white'],
                      [2,'s', 3, 'lightgrey'], 
                      [3,'c', 3, 'darkgrey'], 
                      [4,'b', 4, 'grey'], 
                      [5,'C', 5, 'black']
                    ];
    //data markers
    let currP = 0;
    let currBlock = gamePiece[currP];
    let gameReady = false;
    let gameData = [];
    let gameState = [];
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
        clearBtn.textContent = 'X';
        clearBtn.onclick = ()=>{
            const playBtn = document.querySelector('.play-btn');
            playBtn.classList.remove('game-ready');
            gameReady = false;
            currP = 0;
            currBlock = gamePiece[currP];
            for(let i = 0; i < 7; i++){
                for(let j = 0; j < 7; j++){
                    gameState[i][j][1] = 0;
                    gameState[i][j][2] = 0;
                    gameState[i][j][0].style.backgroundColor = 'rgb(0, 0, 0, 0.3)';
                    gameData[i][j] = 0;  
                }
            }
        
        }

        const gameStartBtn = document.createElement('button');
        gameStartBtn.classList.add('play-btn');
        gameStartBtn.textContent = 'play';
        gameStartBtn.onclick = () => {
            placeContent(startGame(generateEnemyBoard(),generateEnemyBoard()));
            if(gameReady){
                let playerData = gameData;
                let enemyData = generateEnemyBoard();
                console.log('game ready', playerData);
                console.log('enemy board: ', enemyData);
                placeContent(startGame(playerData, enemyData));
                
            }
        }

        
        blockHolder.appendChild(rotateBtn);
        blockHolder.appendChild(clearBtn);
        blockHolder.appendChild(gameStartBtn);
        return blockHolder;
    }
    
    //creates enemy board state
    const generateEnemyBoard = () => {
        let enemyData = [];
        for (let y = 0; y < 7; y++){
            let tempData = [];
            for(let x = 0; x < 7; x++){
                tempData.push(0);
            }
            enemyData.push(tempData);
        }
        function getRandomInt(max, floor) {
            return Math.floor(Math.random() * max + floor);
        }
        for(let i = 0; i<5;){
            orientation = getRandomInt(2,0);
            piece = gamePiece[i][2];
            token = gamePiece[i][0];
            let x = getRandomInt(6,0);
            let y = getRandomInt(6,0);
            if(pieceAvailable(y, x, piece, enemyData)){
                for(let i = 0; i< piece; i++){    
                    enemyData[y + (orientation?i:0)] [x + (orientation?0:i)] = token;
                       
                }
                i++;
            }
        }
        return enemyData;
    }
    
    //check if piece is available
    function pieceAvailable(y, x, piece, data){
        for(let i = 0; i<piece; i++){
            if (orientation && data[y+i]==null){
                    return false;
            }else if (!orientation && data[x+i]==null){
                return false; 
            }
            if(data[y + (orientation?i:0)] [x + (orientation?0:i)] != 0){
                return false;
            }
            
        }
        return true;
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
        //highlights piece
        function pixelHighlight(y, x, active, cB){
            let piece = cB[2];
            if(active){
                if(pieceAvailable(y, x, piece, gameData)){
                    for(let i = 0; i< piece; i++){    
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0].style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
                    }
                }
            }else{
                if(pieceAvailable(y, x, piece, gameData)){
                    for(let i = 0; i < piece ; i++){
                        gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0].style.backgroundColor = 'rgb(0, 0, 0, 0.3)';
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
                const playBtn = document.querySelector('.play-btn');
                playBtn.classList.remove('game-ready');
                gameReady = false;
                editOn = true;
                let tokenChanger = gameData[y][x];
                currBlock = gamePiece[tokenChanger - 1];
                for(let i = 0; i < 7; i++){
                    for(let j = 0; j < 7; j++){
                        if(gameState[i][j][1] == tokenChanger){
                            gameState[i][j][1] = 0;
                            orientation = gameState[i][j][2];
                            gameState[i][j][2] = 0;
                            gameState[i][j][0].style.backgroundColor = 'rgb(0, 0, 0, 0.3)';
                            gameData[i][j] = 0; 
                        }

                    }
                }
            }else if(pieceAvailable(y, x, piece, gameData)){
                //places block
                for(let i = 0; i< piece; i++){    
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][0].style.backgroundColor = color;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][1] = token;
                    gameState[y + (orientation?i:0)] [x + (orientation?0:i)][2] = orientation;

                    gameData[y + (orientation?i:0)] [x + (orientation?0:i)] = token;
                       
                }
                
                editOn?currP:currP++;
                if(currP <= 4){
                    currBlock = gamePiece[currP];
                    
                }else{
                    currBlock = 0;
                    const playBtn = document.querySelector('.play-btn');
                    playBtn.classList.add('game-ready');
                    gameReady = true;
                }
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
//start game
const startGame = (playerBoard, enemyBoard)=>{
    const startGame = document.createElement('div');
    startGame.classList.add('start-game');
    const turnDiv = document.createElement('div');
    turnDiv.classList.add('turn');
    turnDiv.textContent = 'Player Turn';
    let playerData = [];
    let enemyData = [];
    let playerShip = [ 
        [2,'Destroyer'],
        [3,'Submarine'], 
        [3,'Cruiser'], 
        [4,'Battleship'], 
        [5,'Carrier']
      ];
    let enemyShip = [ 
        [2,'Destroyer'],
        [3,'Submarine'], 
        [3,'Cruiser'], 
        [4,'Battleship'], 
        [5,'Carrier']
      ];
    const side = (board, player) =>{
        const side = document.createElement('div');
        side.classList.add('side');

        const sideBoard = document.createElement('div');
        sideBoard.classList.add('start-game-board');

        const sideStatus = document.createElement('div');
        sideStatus.classList.add('side-status');
        sideStatus.textContent = player?'Your Board: ':'Opponent Board: ';
        
        for(let y = 0; y < 7; y++){
            let tempData = [];
            for(let x = 0; x < 7; x++){
                const gamePixel = document.createElement('div');
                gamePixel.classList.add('game-pixel');
                gamePixel.style.backgroundColor = 'rgb(0,0,0, 0.8)';
                tempData.push([gamePixel, board[y][x]])
                gamePixel.onclick = () =>{
                    if(!player){
                        if(hit(enemyData, y, x, enemyShip)){
                            gamePixel.style.color = 'red';
                            gamePixel.textContent = 'x';
                        }else{
                            gamePixel.style.color = 'white';
                            gamePixel.textContent = 'x';
                        }
                        
                    }else{
                        hit(playerData, y, x, playerShip);
                    }
                }
                
                sideBoard.appendChild(gamePixel);
            }
            player?playerData.push(tempData):enemyData.push(tempData);
        }

        side.appendChild(sideStatus);
        side.appendChild(sideBoard);
        return side;
    }
    const hit = (data, y, x, ship) =>{
        const turnStatus = document.querySelector('.turn');
        if(data[y][x][1] != 0){
            if(ship[(data[y][x][1]) - 1][0] != 0){
                turnStatus.textContent = 'Hit!'
                ship[(data[y][x][1]) - 1][0]--;
                if(ship[(data[y][x][1]) - 1][0] == 0){
                    turnStatus.textContent = ship[(data[y][x][1]) - 1][1]+' has been sunk!';
                    }
                    return true;
                
            }
            
        }else{
            turnStatus.textContent = 'Miss'
            return false;
        }
    }

    startGame.appendChild(turnDiv);
    startGame.appendChild(side(playerBoard, true));
    startGame.appendChild(side(enemyBoard,false));
    return startGame;
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
        shapeDiv.style.left = getRandomInt(93, 0)+'vw';
        shapeDiv.style.top = getRandomInt(80, 10)+'vh';
        shapeDiv.style.width = shapeDiv.style.height = getRandomInt(5, 1)+'vmin';
        shapeDiv.style.animationDuration = getRandomInt(10,5)+'s';
        animatedList.appendChild(shapeDiv);

    }
    return animatedList;
}
document.body.appendChild(animatedList());
//places content on the page
const placeContent = (content) =>{
    const currContent = document.querySelector('.content');

    while(currContent.hasChildNodes()){
        currContent.removeChild(currContent.lastChild);
    }

    currContent.appendChild(content);
}



placeContent(newGame());