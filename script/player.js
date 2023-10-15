'use strict';

export default class Player {
  constructor(name, htmlElement) {
    this._name = name;
    this._score = 0;
    this._element = htmlElement;
  }

  scorePoint = () => {
    this._score += 1;
    this._element.children[1].innerHTML = this._score;
  };

  getElement = () => {
    return this._element;
  };
}
