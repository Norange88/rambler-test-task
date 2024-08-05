import EmergingText from './modules/EmergingText';

import { debounce } from './utils/debounce';
import { dispatchCustomEvent } from './utils/dispatchCustomEvent';
import { iOS } from './utils/iOS';

export default class CommonLogic {
  constructor() {
    this.checkIOS();
    this.trackWindowResize();
    this.trackHeaderPos();
    this.initBurger();
    this.initEmerginTextBlocks();
  }

  checkIOS() {
    if (iOS()) {
      document.body.classList.add('iOS');
    }
  }

  trackWindowResize() {
    const triggerResize = () => {
      dispatchCustomEvent('resizeEnd');
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
    header.classList.add('_at-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        header.classList.remove('_at-top');
      } else {
        header.classList.add('_at-top');
      }
    });
  }

  initEmerginTextBlocks() {
    const blocks = document.querySelectorAll('.js-emerging-text');

    Array.from(blocks).forEach((block) => {
      new EmergingText(block);
    });
  }
}
