import * as THREE from 'three';

import Experience from '../../../Experience';
import TetrisPiece from './TetrisPiece';

import { figuresData } from './data';

export default class Figures {
  constructor() {
    this.experience = new Experience();

    this.speedModifier = 7;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.world = this.experience.world;
    this.figuresTotal = figuresData.length;

    this.createInstance();
  }

  createInstance() {
    this.instance = new THREE.Group();
    this.figures = [];

    figuresData.forEach((data, index) => {
      const initialProgress = (1 / this.figuresTotal) * index;
      const figure = new TetrisPiece(data, { initialProgress });
      this.figures.push(figure);
      this.instance.add(figure.instance);
    });

    this.scene.add(this.instance);
  }

  

  update() {
    this.figures.forEach((figure) => {
      figure.update();
    });
  }
}
