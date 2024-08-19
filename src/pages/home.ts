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
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 1,
      // markers: true,
    },
    defaults: { ease: 'power2.inOut', duration: 1 },
  });

  timeline
    .from('[data-reveal="thinking"]', { xPercent: -100, duration: 1.5 }, 0)
    .from('[data-reveal="creative"]', { xPercent: 100, duration: 1.5 }, 0)
    .fromTo(
      topLayer,
      { clipPath: 'circle(0px at 50% 50%)' },
      { clipPath: `circle(${clipDistance(thinking)}px at 50% 50%)` },
      0.5
    )
    .to('[data-reveal="span1"]', { yPercent: -100 }, '-=0.25')
    .to('[data-reveal="span2"]', { yPercent: -100 }, '<0.1')
    .from(about2, { opacity: 0 }, '<')
    .fromTo('[data-reveal="magnify1"]', { scale: 10 / 9, opacity: 1 }, { scale: 1, opacity: 0.1 })
    .fromTo(
      '[data-reveal="magnify2"]',
      { scale: 1, opacity: 0.1 },
      { scale: 10 / 9, opacity: 1 },
      '<'
    );
};

function clipDistance(section: HTMLElement) {
  const rect = section.getBoundingClientRect();
  return Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 2;
}
