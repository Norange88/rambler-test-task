import * as THREE from 'three';

import Sizes from '../../utils/Sizes';
import Camera from './Camera';
import Renderer from './Renderer';
import Time from '../../utils/Time';
import World from './components/World/World';

let instance = null;

export default class Experience {
  constructor(canvas, wrappes) {
    if (instance) {
      return instance;
    }

    instance = this;
    this.isDebug = false;

    this.canvas = canvas;
    this.wrapper = wrappes;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes(this.wrapper);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.time = new Time();
    this.world = new World();
    this.isActive = false;

    this.scrollProgress = 0;

    this.world.init();
    this.bindEvents();
  }

  turnOn() {
    this.isActive = true;
  }

  turnOff() {
    this.isActive = false;
  }

  bindEvents() {
    this.sizes.on('resize', this.resize.bind(this));
    this.time.on('tick', this.update.bind(this));
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  updateProgress(progress) {
    this.scrollProgress = progress;
  }

  update() {
    if (!this.isActive) return;
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
