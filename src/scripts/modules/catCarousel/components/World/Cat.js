import * as THREE from 'three';
import Experience from '../../Experience';

const CAT_IMG_SRC = '/images/cat.png';

export default class Cat {
  constructor() {
    this.experience = new Experience();

    this.scene = this.experience.scene;

    this.createInstance();
  }

  async createInstance() {
    const loadingManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const texture = textureLoader.load(CAT_IMG_SRC);

    texture.generateMipmaps = false;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;

    const width = 10;
    const height = 10;

    this.material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.01
    });
    this.geometry = new THREE.PlaneGeometry(width, height);
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(0, 5, 0);

    this.scene.add(this.mesh);
  }
}
