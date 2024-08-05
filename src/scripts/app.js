import CommonLogic from './common';
import HeroBlock from './modules/HeroBlock';
import CatCarousel from './modules/CatCarousel/CatCarousel';

import { dispatchCustomEvent } from './utils/dispatchCustomEvent';

document.addEventListener('DOMContentLoaded', () => {
  new CommonLogic();
  new HeroBlock();
  new CatCarousel();

  setTimeout(() => {
    window.scrollTo(0, 0);
    document.body.classList.remove('noscroll');
    document.body.classList.remove('loading');
    dispatchCustomEvent('resizeEnd');
  }, 1000);
});
