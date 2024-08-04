export default class HeroBlock {
  constructor() {
    this.illustrationsContainer = document.querySelector('#hero-illustrations');

    this.rotateTitle();

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('resizeEnd', this.rotateTitle.bind(this));
  }

  rotateTitle() {
    const ratio =
      this.illustrationsContainer.offsetHeight /
      this.illustrationsContainer.offsetWidth;
    const angleRad = Math.atan(ratio);
    const angleDeg = (angleRad * (180 / Math.PI)).toFixed(2);
    const title = document.querySelector('#hero-title');
    title.style.setProperty('--diagonal-angle', `-${angleDeg}deg`);
  }
}
