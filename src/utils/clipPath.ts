import gsap from 'gsap';

import { calculateFurthestPoint } from './calculateFurthestPoint';

export const clipPath = (
  direction: 'in' | 'out',
  wrapper: HTMLElement,
  toClip: HTMLElement,
  event: MouseEvent
) => {
  const distance = calculateFurthestPoint(event);

  // get the element's positioning
  const rect = wrapper.getBoundingClientRect();

  // get the mouse position relative to the element
  let x = event.clientX - rect.left,
    y = event.clientY - rect.top;

  x = x < 0 ? 0 : x;
  y = y < 0 ? 0 : y;

  // calculate the percentage for the clip-path
  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  if (direction === 'in') {
    toClip.style.clipPath = `circle(0px at ${xPercent}% ${yPercent}%)`;
  }

  gsap.to(toClip, {
    clipPath: `circle(${direction === 'in' ? distance : 0}px at ${xPercent}% ${yPercent}%)`,
    duration: 0.5,
    ease: 'power2.out',
  });
};
