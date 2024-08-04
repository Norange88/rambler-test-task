import EventEmitter from './EventEmitter';

export default class Sizes extends EventEmitter {
  constructor(wrapper) {
    super();

    this.wrapper = wrapper;

    this.setValues();
    this.bindEvents();
  }

  setValues() {
    if (this.wrapper) {
      this.width = this.wrapper.offsetWidth;
      this.height = this.wrapper.offsetHeight;
    } else {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }

    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    const isVertical = this.aspect < 1.2;

    if (
      typeof this.isVertical !== undefined &&
      this.isVertical !== isVertical
    ) {
      this.isVertical = isVertical;
      this.trigger('orientationChange');
    }

    this.isVertical = isVertical;
  }

  bindEvents() {
    window.addEventListener('resizeEnd', () => {
      this.setValues();
      this.trigger('resize');
    });
  }
}
