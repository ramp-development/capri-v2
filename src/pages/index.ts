import { home } from './home';

export const pages = () => {
  // eslint-disable-next-line no-console
  console.log('pages');

  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      home();
      break;
  }
};
