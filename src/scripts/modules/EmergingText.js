import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class EmergingText {
  constructor(el) {
    this.el = el;
    this.originalChildren = this.el.childNodes;
    this.scrollTriggers = [];

    this.createLayout();
    this.watchScroll();
  }

  createLayout() {
    let result = '';

    Array.from(this.originalChildren).forEach((child) => {
      if (child.nodeName === '#text') {
        const words = this.splitStringToWords(child.textContent);
        words.forEach((word) => {
          const wordHtml = this.createWordHtml(word);
          result = `${result}${wordHtml}`;
        });
      } else {
        const elHtml = this.createWordHtml(child.outerHTML, false);
        result = `${result}${elHtml}`;
      }
    });

    this.el.innerHTML = result;
    this.el.classList.add('_ready');
  }

  createWordHtml(word, addSpace = true) {
    if (!word.trim().length) return '';
    const spacer = !addSpace ? '' : '&nbsp;';
    return `<span class="emerging-text__word">${word}${spacer}</span>`;
  }

  splitStringToWords(string) {
    return string.trim().split(' ');
  }

  watchScroll() {
    this.words = this.el.querySelectorAll('.emerging-text__word');

    Array.from(this.words).forEach((word) => {
      const trigger = ScrollTrigger.create({
        trigger: word,
        start: 'bottom bottom',
        end: '300% bottom',
        scrub: true,
        onEnter: () => {
          word.classList.add('_active');
        },
        onLeaveBack: () => {
          word.classList.remove('_active');
        },
      });

      this.scrollTriggers.push(trigger);
    });
  }
}
