import { simulateEvent } from '@finsweet/ts-utils';

import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const contact = () => {
  // eslint-disable-next-line no-console
  console.log('contact');

  const attr = 'data-contact';
  const button = queryElement<HTMLAnchorElement>(`[${attr}="button"]`);
  if (!button) return;

  const triggers = queryElements<HTMLAnchorElement>(`[${attr}="trigger"]`);
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      simulateEvent(button, 'click');
    });
  });
};
