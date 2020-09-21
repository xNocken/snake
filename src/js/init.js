import $ from 'jquery';

import globals from './globals';

export default () => {
  const { arraySize } = globals;

  globals.grid = Array.from({ length: arraySize }).map(() => Array.from({ length: arraySize }).map(() => 0));
  global.globals = globals;

  $(document).on('keydown', ({ key }) => {
    switch (key) {
      case 'w':
        globals.dir = [0, -1];
        break;
      case 'a':
        globals.dir = [-1, 0];
        break;
      case 's':
        globals.dir = [0, 1];
        break;
      case 'd':
        globals.dir = [1, 0];
        break;
      default:
    }
  });
};
