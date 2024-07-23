import { gsap } from 'gsap';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const buttons = () => {
  // eslint-disable-next-line no-console
  console.log('button');

  const buttons = queryElements<HTMLLinkElement>('.circle-btn_parent');
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', (e) => {
      buttonClipPath('in', button, e);
    });

    button.addEventListener('mouseleave', (e) => {
      buttonClipPath('out', button, e);
    });
  });

  function buttonClipPath(direction: 'in' | 'out', button: HTMLLinkElement, e: Event) {
    const topLayer = queryElement<HTMLDivElement>('.is-top', button);
    if (!topLayer) return;

    const buttonRect = button.getBoundingClientRect();
    const x = e.clientX - buttonRect.left;
    const y = e.clientY - buttonRect.top;

    const xPercent = (x / buttonRect.width) * 100;
    const yPercent = (y / buttonRect.height) * 100;

    if (direction === 'in' && topLayer) {
      topLayer.style.clipPath = `circle(0% at ${xPercent}% ${yPercent}%)`;
    }

    gsap.to(topLayer, {
      clipPath: `circle(${direction === 'in' ? 150 : 0}% at ${xPercent}% ${yPercent}%)`,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
};
