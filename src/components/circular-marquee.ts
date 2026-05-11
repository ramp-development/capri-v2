import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const circularMarquee = () => {
  // Configuration
  const TRANSFORM_ORIGIN_VW = 100;

  const component = queryElement('[data-circular-marquee="component"]');
  if (!component) return;

  const list = queryElement('[data-circular-marquee="list"]');

  let tl: gsap.core.Timeline | null = null;
  let originalHTML = '';
  let clonedLists: Element[] = [];

  const init = () => {
    list.style.removeProperty('width');
    // Kill existing timeline if it exists
    if (tl) {
      tl.kill();
    }

    // Remove any cloned lists
    clonedLists.forEach((clone) => clone.remove());
    clonedLists = [];

    // Reset to original HTML
    if (!originalHTML) {
      originalHTML = list.innerHTML;
    } else {
      list.innerHTML = originalHTML;
    }

    const originalItems = queryElements<HTMLDivElement>('[data-circular-marquee="item"]');

    // Calculate how many items we need to fill the circle
    const firstItemHeight = originalItems[0].offsetHeight;
    const viewportWidth = window.innerWidth;
    const transformOriginPx = (TRANSFORM_ORIGIN_VW / 100) * viewportWidth;
    const circumference = Math.PI * 2 * transformOriginPx;
    const totalSlotsNeeded = Math.floor(circumference / firstItemHeight);
    const duplicationsNeeded = Math.floor(totalSlotsNeeded / originalItems.length);

    // Calculate width of list
    const maxItemWidth = originalItems.reduce((max, items) => {
      return Math.max(max, items.offsetWidth);
    }, -Infinity);

    list.style.width = `${maxItemWidth}px`;

    // Clone and append lists
    const clone = list.cloneNode(true);
    for (let i = 1; i < duplicationsNeeded; i++) {
      const newClone = clone.cloneNode(true) as Element;
      list.parentElement!.appendChild(newClone);
      clonedLists.push(newClone);
    }

    // Re-query all items including duplicates
    const items = component.querySelectorAll<HTMLDivElement>('[data-circular-marquee="item"]');
    const rotateBy = 360 / items.length;

    let activeIndex = 0;

    tl = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 1,
        ease: 'none',
      },
    });

    tl.set(items, {
      position: 'absolute',
      rotate: (index) => `${index * rotateBy * -1}deg`,
      paddingRight: (index) => (index === activeIndex ? '4em' : '2em'),
      opacity: (index) => (index === activeIndex ? 1 : 0.5),
    });

    items.forEach((item, index) => {
      tl!.to(items, {
        rotate: `+=${rotateBy}`,
        onStart: () => {
          activeIndex = index;

          items.forEach((item, idx) => {
            if (idx === activeIndex + 1 || (activeIndex === items.length - 1 && idx === 0)) {
              gsap.to(item, { paddingRight: '4em', opacity: 1, duration: 0.5, delay: 0.5 });
            } else {
              gsap.to(item, { paddingRight: '2em', opacity: 0.5, duration: 0.5, delay: 0.5 });
            }
          });
        },
      });
    });
  };

  init();

  window.addEventListener('resize', init);
};
