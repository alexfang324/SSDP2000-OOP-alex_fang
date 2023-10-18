'use strict';
class Player {
  constructor(name, id, updateScoreBoard) {
    this._name = name;
    this._id = id //array position in the game.players array
    this._score = 0;
    const playerElement = document.createElement('div');
    playerElement.classList.add('player');
    playerElement.innerHTML = `<p class="name">${this._name}</p><p class="score">${this._score}</p>`;
    this._element = playerElement;
  }

  scorePoint = (updateScoreBoard) => {
    this._score += 1;
    updateScoreBoard(this);
  };

  getElement = () => {
    return this._element;
  };

  getName = () => {
    return this._name;
  };

  getId = ()=>{
    return this._id;
  }

  getScore = () => {
    return this._score;
  };
}


const game = {
  titile: 'Pink Point Scoring Game',
  isRunning: false,
  players: [],
  curIndex: 0,
  activePlayer: null,
  mainElement: document.getElementById('main'),
  addPlayerBtn: document.getElementById('add-player-button'),
  starGameElement: document.getElementById('start-game'),
  pauseGameElement: document.getElementById('pause-game'),
  switchPlayerElement: document.getElementById('switch-player'),
  scorePointElement: document.getElementById('score-point'),
  scoreBoard: document.getElementById('score-board'),
  addPlayerToGame: function (){
    //allow add player while the Start Game button is still on display
    if (game.starGameElement.innerHTML=='Start Game') {

      //only add the player if the name exist and not empty spaces
      const inputElement = document.getElementById('name-input');
      const name = inputElement.value.trim();
      if (name){
        inputElement.value = '';
        const player = new Player(name, game.players.length, game.updateScoreBoard)
        game.scoreBoard.appendChild(player.getElement());
        game.players.push(player);
      }

    }
  },
  startGame: function(){
    //toggle on all the gaming buttons if there is at least one player
    if (game.players.length) {
      game.toggleRunning();
      //set first player as active player and turn on colored highlight on the board element
      game.activePlayer = game.players[0];
      game.activePlayer.getElement().classList.toggle('active')
    }
  },
  
  //update point for the player in the scoreBoard element
  updateScoreBoard: function (player){ 
    player.getElement().children[1].innerHTML = player.getScore();
  },

  switchPlayer: function(){
    if (game.isRunning) {
      //turn colored highlight off for current player on the board element
      game.activePlayer.getElement().classList.toggle('active')

      //calculate new array index of the new active player
      const newInd = (game.activePlayer.getId() + 1) % game.players.length;
      
      //set the new active player and turn on its colored highlight on the board element
      game.activePlayer = game.players[newInd];
      game.activePlayer.getElement().classList.toggle('active');
    } 
  },

  //toggle game state and button click-ability
  toggleRunning: function(){
    game.isRunning = !game.isRunning;
    game.starGameElement.innerHTML = game.isRunning? 'Pause':'Resume';
    game.mainElement.classList.toggle('active');
    game.switchPlayerElement.classList.toggle('active');
    game.scorePointElement.classList.toggle('active');
  },

  scorePoint: function(){
    if (game.isRunning) {
      game.activePlayer.scorePoint(game.updateScoreBoard);
    }
  }
    
};

//Adding event listener for each button
game.addPlayerBtn.addEventListener('click', game.addPlayerToGame);
game.starGameElement.addEventListener('click', game.startGame);
game.pauseGameElement.addEventListener('click', game.toggleRunning);
game.switchPlayerElement.addEventListener('click', game.switchPlayer);
game.scorePointElement.addEventListener('click', game.scorePoint);

