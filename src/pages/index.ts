import { daas } from './daas';
import { home } from './home';

export const pages = () => {
  // eslint-disable-next-line no-console
  console.log('pages');

  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      home();
      break;
    case '/design-as-a-service':
      daas();
      break;
  }
};
