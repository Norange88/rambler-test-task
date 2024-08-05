import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();

    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.isDebug = this.experience.isDebug;

    this.setInstance();
    this.bindEvents();
    this.isDebug && this.setOrbitControls();
  }

  bindEvents() {
    this.sizes.on('orientationChange', () => {
      this.updateCameraPosition();
    });
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );

    this.scene.add(this.instance);
    this.updateCameraPosition();
  }

  updateCameraPosition() {
    const isHorizontal = this.sizes.aspect > 1.2;

    if (!isHorizontal) {
      this.instance.position.set(-2.2, 5, 24);
      this.instance.lookAt(-2.2, 5, 0);
    } else {
      this.instance.position.set(-1, 5, 20);
      this.instance.lookAt(-1, 5, 0);
    }
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(this.instance, this.canvas);
    this.orbitControls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.aspect;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.orbitControls && this.orbitControls.update();
  }
}
