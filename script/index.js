'use strict';
import Player from './player.js';

const game = {
  titile: 'Pink Point Scoring Game',
  isRunning: false,
  players: [],
  curIndex: 0,
  activePlayer: null,
  scoreBoard: null
};

const mainElement = document.getElementById('main');
const addPlayerBtn = document.getElementById('add-player-button');
game.scoreBoard = document.getElementById('score-board');
const starGameElement = document.getElementById('start-game');
const pauseGameElement = document.getElementById('pause-game');
const switchPlayerElement = document.getElementById('switch-player');
const scorePointElement = document.getElementById('score-point');

addPlayerBtn.addEventListener('click', () => {
  if (!game.isRunning) {
    const inputElement = document.getElementById('name-input');
    const name = inputElement.value;
    inputElement.value = '';

    const playerElement = document.createElement('div');
    playerElement.classList.add('player');
    playerElement.innerHTML = `<p class="name">${name}</p><p class="score">0</p>`;
    game.scoreBoard.appendChild(playerElement);
    game.players.push(new Player(name, playerElement));
  }
});

starGameElement.addEventListener('click', () => {
  if (game.players.length) {
    starGameElement.style.display = 'none';
    starGameElement.innerHTML = 'Resume';
    mainElement.classList.add('active');
    pauseGameElement.style.display = 'block';
    game.isRunning = true;

    switchPlayerElement.style.color = 'white';
    switchPlayerElement.classList.add('active');
    scorePointElement.style.color = 'white';
    scorePointElement.classList.add('active');

    game.activePlayer = game.players[0];
    const curPlayerElement = game.activePlayer.getElement();
    curPlayerElement.classList.add('active');
  }
});

pauseGameElement.addEventListener('click', () => {
  pauseGameElement.style.display = 'none';
  starGameElement.style.display = 'block';
  mainElement.classList.remove('active');
  game.isRunning = false;
  switchPlayerElement.classList.remove('active');
  switchPlayerElement.style.color = 'rgba(255, 255, 255, 0.3)';
  scorePointElement.classList.remove('active');
  scorePointElement.style.color = 'rgba(255, 255, 255, 0.3)';
});

switchPlayerElement.addEventListener('click', () => {
  if (switchPlayerElement.classList.contains('active')) {
    const activePlayerInd = game.players.indexOf(game.activePlayer);
    const newInd = (activePlayerInd + 1) % game.players.length;
    game.activePlayer = game.players[newInd];
    const playerElements = document.querySelectorAll('.player');
    for (const playerElement of playerElements) {
      playerElement.classList.remove('active');
    }

    const curPlayerElement = game.activePlayer.getElement();
    curPlayerElement.classList.add('active');
  }
});

scorePointElement.addEventListener('click', () => {
  if (scorePointElement.classList.contains('active')) {
    game.activePlayer.scorePoint();
  }
});
