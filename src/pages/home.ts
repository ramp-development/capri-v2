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
    { clipPath: 'circle(0% at 50% 50%)' },
    { clipPath: `circle(${calculateClipPercentage(thinking)}% at 50% 50%)` }
  );
};

function calculateClipPercentage(section: HTMLElement) {
  // Get the dimensions of the section
  const rect = section.getBoundingClientRect();
  const sectionWidth = rect.width;
  const sectionHeight = rect.height;

  // Calculate the diagonal of the screen
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const diagonal = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight);

  // Calculate the radius (half of the diagonal)
  const radius = diagonal / 2;

  // Calculate the percentage for the clip-path
  // We multiply by 100 to convert to percentage and add some extra to ensure full coverage
  const clipPercentage = (radius / Math.min(sectionWidth, sectionHeight)) * 100;

  return clipPercentage;
}
