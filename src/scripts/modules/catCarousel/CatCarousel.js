import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

import Experience from './Experience';

gsap.registerPlugin(ScrollTrigger);

export default class CatCarousel {
  constructor() {
    this.section = document.getElementById('cat-tetris-section');
    this.canvas = document.getElementById('cat-tetris-canvas');
    this.experience = new Experience(this.canvas, this.section);

    this.initScrollTrigger();
  }

  initScrollTrigger() {
    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.canvas,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      pin: false,
      onUpdate: (self) => {
        this.experience?.updateProgress(self.progress);
      },
      onToggle: (self) => {
        if (self.isActive) {
          this.experience.turnOn();
        } else {
          this.experience.turnOff();
        }
      },
    });
  }
}
