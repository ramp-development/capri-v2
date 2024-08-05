import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { queryElement } from '$utils/queryElement';

export const home = () => {
  // eslint-disable-next-line no-console
  console.log('home');

  const thinking = queryElement<HTMLDivElement>('.is-thinking');
  if (!thinking) return;

  const topLayer = queryElement<HTMLDivElement>('.is-top', thinking);
  const about2 = queryElement<HTMLDivElement>('.about-2', thinking);
  if (!topLayer || !about2) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: thinking,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      markers: true,
    },
    defaults: { ease: 'power2.inOut', duration: 1 },
  });

  timeline
    .to('[data-reveal="span1"]', { xPercent: -100, opacity: 0 }, 0)
    .to('[data-reveal="span2"]', { xPercent: 100, opacity: 0 }, 0)
    .fromTo(
      topLayer,
      { clipPath: 'circle(0px at 50% 50%)' },
      { clipPath: `circle(${clipDistance(thinking)}px at 50% 50%)` },
      0
    )
    .from(about2, { opacity: 0 }, 0.5)
    .fromTo(
      '[data-reveal="magnify1"]',
      { scale: 1.333333333333, opacity: 1 },
      { scale: 1, opacity: 0.1 },
      '-=0.5'
    )
    .fromTo(
      '[data-reveal="magnify2"]',
      { scale: 1, opacity: 0.1 },
      { scale: 1.333333333333, opacity: 1 },
      '<'
    );
};

function clipDistance(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  return Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 2;
}
