varying vec2 vUv;
uniform vec3 uColor;

void main() {
  float strength = distance(vUv, vec2(0.5, 0.5)) + 0.5;
  // vec3 uvColor = vec3(vUv, 1.0);
  // vec3 mixedColor = mix(blackColor, uvColor, strength);
  gl_FragColor = vec4(uColor, 1.0);
  gl_FragColor.a = 1.0 - strength;
}