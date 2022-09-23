const newGame = () =>{
    const newGame = document.createElement('div');
    newGame.classList.add('new-game');

    const shipHolder = document.createElement('div');
    shipHolder.classList.add('ship-holder');



    newGame.appendChild(shipHolder);
    newGame.appendChild(placeGameBoard());

    return newGame;
}
const shipHolder = () =>{

}
let gameState = [];
const placeGameBoard = () =>{
    const newGameboard = document.createElement('div');
    newGameboard.classList.add('game-board')

    for(let x = 1; x <= 7; x++){
        for(let y = 1; y <= 7; y++){
            const gamePixel = document.createElement('div');
            gamePixel.classList.add('game-pixel')
            let coords = [x, y]
            gameState.push([coords, gamePixel, 0]);
            gamePixel.onclick =()=>{
                console.log(gameState[(x*y) - 1]);
            }
            newGameboard.appendChild(gamePixel);
        }
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