import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

export default class RoundShadow {
  static geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
  static material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    opacity: 0.1,
    transparent: true,
    uniforms: {
      uColor: {
        value: new THREE.Color('#000'),
      },
    },
  });

  constructor({ scale = 1, opacity = 1, color = '#000000' }) {
    this.scale = scale;
    this.opacity = opacity;
    this.color = color;

    this.createInstance();
  }

  createInstance() {
    this.instance = new THREE.Mesh(
      this.constructor.geometry,
      this.constructor.material
    );

    this.instance.scale.set(this.scale, this.scale, this.scale);
    this.instance.material.uniforms.uColor.value.set(this.color);
  }
}
