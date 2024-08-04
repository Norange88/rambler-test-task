import CommonLogic from './common';
import HeroBlock from './modules/HeroBlock';
import CatCarousel from './modules/catCarousel/catCarousel';

document.addEventListener('DOMContentLoaded', () => {
  new CommonLogic();
  new HeroBlock();
  new CatCarousel();
});
