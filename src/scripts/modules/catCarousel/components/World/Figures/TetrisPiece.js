import * as THREE from 'three';
import RoundShadow from '../RoundShadow/RoundShadow';
import Experience from '../../../Experience';

export default class TetrisPiece {
  static loadingManager = new THREE.LoadingManager();
  static textureLoader = new THREE.TextureLoader(this.loadingManager);

  constructor(data, { initialProgress = 0 }) {
    this.data = data;

    this.shadowScale = 4;
    this.speedMod = 0.25;
    this.floatOffset = Math.random();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.initialProgress = initialProgress;
    this.world = this.experience.world;
    this.path = this.world.path;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.posCorrectionY = 0;

    this.createInstance();
    this.createShadow();
  }

  createInstance() {
    const texture = this.constructor.textureLoader.load(this.data.img);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.flipY = !this.data.flip;

    this.material = new THREE.MeshBasicMaterial({
      // color: '#ff0000',
      map: texture,
      transparent: true,
      alphaTest: 0.01,
    });
    this.geometry = new THREE.PlaneGeometry(3, 3);
    this.instance = new THREE.Mesh(this.geometry, this.material);
    this.instance.rotation.z = THREE.MathUtils.degToRad(this.data.rotation);
  }

  createShadow() {
    this.shadow = new RoundShadow({
      scale: this.shadowScale,
      opacity: 0.2,
      color: '#dbe0de',
    });
    this.shadow.instance.rotation.x = -Math.PI * 0.5;
    this.shadow.instance.position.x = this.instance.position.x;
    this.shadow.instance.position.z = this.instance.position.z;
    this.scene.add(this.shadow.instance);
  }

  updatePosition(progress) {
    let figureProgress = progress + this.initialProgress;
    if (figureProgress > 1) {
      figureProgress = figureProgress - 1;
    }
    const position = this.path.instance.getPointAt(figureProgress);
    this.instance.position.copy(position);
    console.log(this.posCorrectionY);
    this.instance.position.y += this.posCorrectionY;
  }

  updateScale() {
    const zMax = this.experience.world.path.zMax;
    const zMin = this.experience.world.path.zMin;
    const zDistance = Math.abs(zMax) + Math.abs(zMin);
    const opacityMax = 1;
    const opacityMin = 0.5;
    const scaleMax = 1;
    const scaleMin = 0.6;

    const distanceFromMax = -1 * (this.instance.position.z - zMax);
    const correctionStrength = 1 - distanceFromMax / zDistance;

    const scaleMod = this.sizes.isVertical ? 0.6 : 0.8;

    const scale = Math.min(
      (correctionStrength + scaleMin) * scaleMod,
      scaleMax
    );
    const opacity = Math.min(correctionStrength + opacityMin, opacityMax);
    this.instance.scale.set(scale, scale, scale);
    this.instance.material.opacity = opacity;
  }

  updateShadow() {
    const scale = new THREE.Vector3().copy(this.instance.scale);
    this.shadow.instance.position.x = this.instance.position.x;
    this.shadow.instance.position.z = this.instance.position.z;
    this.shadow.instance.scale.copy(scale.multiplyScalar(this.shadowScale));
  }

  updateFloatPos() {
    const time = this.time.elapsed / 1000;
    const moveAmount = Math.sin(time + this.floatOffset * 100) / 8;

    this.posCorrectionY = moveAmount;
  }

  update() {
    // const progress =
    //   (((this.time.elapsed / (this.path.length * 30)) % 10) / 10) *
    //   this.speedMod;

    const progress = this.experience.scrollProgress * this.speedMod;

    this.updateFloatPos();
    this.updatePosition(progress);
    this.updateScale();
    this.updateShadow();
  }
}
