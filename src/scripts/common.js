import { debounce } from './utils/debounce';

export default class CommonLogic {
  constructor() {
    this.trackWindowResize();
    this.trackHeaderPos();
    this.initBurger();
  }

  trackWindowResize() {
    const triggerResize = () => {
      document.body.dispatchEvent(
        new CustomEvent('resizeEnd', {
          bubbles: true,
          detail: {},
        })
      );
    };

    const debouncedResize = debounce(triggerResize, 300);
    window.addEventListener('resize', debouncedResize);
  }

  initBurger() {
    const burger = document.querySelector('.js-burger');

    burger.addEventListener('click', () => {
      burger.classList.toggle('_opened');
    });
  }

  trackHeaderPos() {
    const header = document.querySelector('#header');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        header.classList.remove('_at-top');
      } else {
        header.classList.add('_at-top');
      }
    });
  }
}
