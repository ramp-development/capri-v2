import { buttons } from './buttons';
import { circularMarquee } from './circular-marquee';
import { contact } from './contact';
import { footer } from './footer';

export const components = () => {
  // eslint-disable-next-line no-console
  console.log('components');

  buttons();
  circularMarquee();
  contact();
  footer();
};
