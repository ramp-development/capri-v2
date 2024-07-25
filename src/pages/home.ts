import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';

export const home = () => {
  // eslint-disable-next-line no-console
  console.log('home');

  const thinking = queryElement<HTMLDivElement>('.is-thinking');
  if (!thinking) return;

  const topLayer = queryElement<HTMLDivElement>('.is-top', thinking);
  if (!topLayer) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: thinking,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  });

  timeline.fromTo(
    topLayer,
    { clipPath: 'circle(0px at 50% 50%)' },
    { clipPath: `circle(${clipDistance(thinking)}px at 50% 50%)` }
  );
};

function clipDistance(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  return Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 2;
}
