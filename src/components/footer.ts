import { clipPath } from '$utils/clipPath';
import { queryElement } from '$utils/queryElement';

export const footer = () => {
  // eslint-disable-next-line no-console
  console.log('footer');

  const container = queryElement<HTMLDivElement>('.footer-contain');
  if (!container) return;

  const background = queryElement<HTMLDivElement>('.footer-circle', container);
  if (!background) return;

  container.addEventListener('mouseenter', (event) => {
    clipPath('in', container, background, event);
  });

  container.addEventListener('mouseleave', (event) => {
    clipPath('out', container, background, event);
  });
};
