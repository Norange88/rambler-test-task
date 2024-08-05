export default class HeroBlock {
  constructor() {
    this.illustrationsContainer = document.querySelector('#hero-illustrations');
    this.figures = this.illustrationsContainer.querySelectorAll('.js-figure');

    this.rotateTitle();
    this.bindEvents();
    this.initFiguresFloat();
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

  initFiguresFloat() {
    setTimeout(() => {
      Array.from(this.figures).forEach((figure) => {
        figure.classList.add('_floating');
      });
    }, 2000);
  }
}
