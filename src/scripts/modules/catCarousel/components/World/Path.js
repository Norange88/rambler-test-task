import * as THREE from 'three';

import Experience from '../../Experience';
import EventEmitter from '../../../../utils/EventEmitter';

export const pathPoints = [
  [-1.5, 4.5, 1],
  [4.7, 7, 0.5],
  [11, 5, -8],
  [9.5, 3, -13],
  [6.5, 2.5, -17],
  [0, 3, -23],
  [-12.75, 6, -22],
  [-15, 4, -15],
  [-9, 2, -2.5],
];

export const pathPointsMobile = [
  [-1.5, 4.5, 1],
  [5.7, 7, 0.5],
  [12, 5, -8],
  [10.5, 3, -10],
  [7.5, 2.5, -14],
  [0, 3, -18],
  [-7, 4.2, -17],
  [-8.5, 3, -12],
  [-6.5, 2, -3],
];

export default class Path extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();

    this.sizes = this.experience.sizes;

    this.isDebug = this.experience.isDebug;
    this.scene = this.experience.scene;

    this.createInstance();
    this.bindEvents();
  }

  bindEvents() {
    this.sizes.on('orientationChange', () => {
      this.createInstance();
    });
  }

  calculateMinMax() {
    const zCoords = this.pathPoints.map((coords) => coords[2]);
    const zMin = Math.min(...zCoords);
    const zMax = Math.max(...zCoords);

    return [zMax, zMin];
  }

  createInstance() {
    if (this.instance) {
      this.scene.remove(this.instance);
    }

    this.pathPoints = this.sizes.isVertical ? pathPointsMobile : pathPoints;

    this.instance = new THREE.CatmullRomCurve3(
      this.pathPoints.map((point) => new THREE.Vector3(...point)),
      true
    );

    [this.zMax, this.zMin] = this.calculateMinMax();
    this.length = Math.floor(this.instance.getLength());

    if (!this.isDebug) return;

    const points = this.instance.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 0,
      opacity: 1,
      transparent: true,
    });

    const line = new THREE.Line(geometry, material);
    line.renderOrder = 999;
    this.scene.add(line);

    this.renderPathPoints();
  }

  renderPathPoints() {
    const geometry = new THREE.SphereGeometry(0.5);
    const material = new THREE.MeshBasicMaterial({ color: '#00ff00' });

    this.pathPoints.forEach((point) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...point);
      this.scene.add(mesh);
    });
  }
}
