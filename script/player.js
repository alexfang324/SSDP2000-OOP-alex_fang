'use strict';

export default class Player {
  constructor(name, addPlayerToGame) {
    this._name = name;
    this._score = 0;
    const playerElement = document.createElement('div');
    playerElement.classList.add('player');
    playerElement.innerHTML = `<p class="name">${this._name}</p><p class="score">${this._score}</p>`;
    this._element = playerElement;
    addPlayerToGame(this);
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

  getScore = () => {
    return this._score;
  };
}
