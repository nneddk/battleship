const newGame = () =>{
    const newGame = document.createElement('div');
    newGame.classList.add('new-game');

    const shipHolder = document.createElement('div');
    shipHolder.classList.add('ship-holder');



    newGame.appendChild(shipHolder);
    newGame.appendChild(placeGameBoard());

    return newGame;
}
let gameState = [];
const placeGameBoard = () =>{
    const newGameboard = document.createElement('div');
    newGameboard.classList.add('game-board')

    for(let i = 0; i < 49; i++){
        const gamePixel = document.createElement('div');
        gamePixel.classList.add('game-pixel')
        newGameboard.appendChild(gamePixel);
    }

    return newGameboard;
}

//replace content
const placeContent = (content) =>{
    const currContent = document.querySelector('.content');

    while(currContent.hasChildNodes()){
        currContent.removeChild(currContent.lastChild);
    }

    currContent.appendChild(content);
}

placeContent(newGame());