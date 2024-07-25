import { clipPath } from '$utils/clipPath';
import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const buttons = () => {
  // eslint-disable-next-line no-console
  console.log('button');

  const buttons = queryElements<HTMLLinkElement>('.circle-btn_parent');
  buttons.forEach((button) => {
    const topLayer = queryElement<HTMLDivElement>('.is-top', button);
    if (!topLayer) return;

    button.addEventListener('mouseenter', (event) => {
      clipPath('in', button, topLayer, event);
    });

    button.addEventListener('mouseleave', (event) => {
      clipPath('out', button, topLayer, event);
    });
  });
};
