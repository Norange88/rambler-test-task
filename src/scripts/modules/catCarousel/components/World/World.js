import Experience from '../../Experience';
import Cat from './Cat';
import Path from './Path';
import Figures from './Figures/Figures';

export default class World {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;
  }

  init() {
    this.cat = new Cat();
    this.path = new Path();
    this.figures = new Figures();
  }

  update() {
    this.figures.update();
  }
}
