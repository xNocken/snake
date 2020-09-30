import $ from 'jquery';

import globals from './globals';

export default () => {
  const { arraySize } = globals;

  globals.grid = Array.from({ length: arraySize }).map(() => Array.from({ length: arraySize }).map(() => 0));
  global.globals = globals;

  $(document).on('keydown', (event) => {
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        if ((globals.dirArr[globals.dirArr.length - 1] || globals.dir)[1] === 1 && globals.snackCount !== 0) {
          break;
        }
        globals.dirArr.push([0, -1]);
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'a':
        if ((globals.dirArr[globals.dirArr.length - 1] || globals.dir)[0] === 1 && globals.snackCount !== 0) {
          break;
        }
        globals.dirArr.push([-1, 0]);
        break;
      case 'ArrowDown':
      case 's':
        if ((globals.dirArr[globals.dirArr.length - 1] || globals.dir)[1] === -1 && globals.snackCount !== 0) {
          break;
        }
        globals.dirArr.push([0, 1]);
        event.preventDefault();
        break;
      case 'd':
      case 'ArrowRight':
        if ((globals.dirArr[globals.dirArr.length - 1] || globals.dir)[0] === -1 && globals.snackCount !== 0) {
          break;
        }
        globals.dirArr.push([1, 0]);
        break;
      default:
    }
  });
};
