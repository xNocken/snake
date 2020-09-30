import $ from 'jquery';
import globals from './globals';
import utils from './utils';

export default () => {
  if (globals.dirArr.length) {
    globals.dir = globals.dirArr.shift();
  }

  const {
    pos,
    dir,
    arraySize,
    grid,
    snackCount,
  } = globals;

  globals.pos.unshift([
    (pos[0][0] + dir[0]) % arraySize,
    (pos[0][1] + dir[1]) % arraySize,
  ]);

  globals.posDir.unshift(dir);

  if (snackCount < pos.length - 1) {
    globals.pos.pop();
    globals.posDir.pop();
  }

  if (pos[0][0] < 0) {
    globals.pos[0][0] = arraySize - 1;
  }

  if (pos[0][1] < 0) {
    globals.pos[0][1] = arraySize - 1;
  }

  if (grid[pos[0][1]][pos[0][0]] === 1) {
    globals.snackCount += 1;
    globals.grid[pos[0][1]][pos[0][0]] = 0;
  }

  globals.pos.slice(1, globals.pos.length).forEach((bodyPos) => {
    if (bodyPos[0] === globals.pos[0][0] && bodyPos[1] === globals.pos[0][1]) {
      window.cancelAnimationFrame(globals.animationFrame);
      $('#gameover').show();
      $('#score').text(globals.snackCount);
    }
  });

  while (utils.getSnackCount(grid) < globals.maxSnackCount && utils.getEmptyFields(globals.pos, grid).length) {
    const emptyFields = utils.getEmptyFields(globals.pos, grid);
    const index = Math.floor(Math.random() * emptyFields.length);
    const [y, x] = emptyFields[index];

    globals.grid[x][y] = 1;
  }

  if (globals.autoplay) {
    if (globals.pos[0][0] === arraySize - 1 && !globals.ignore) {
      globals.ignore = true;
      globals.dirArr.push([0, 1], [-1, 0]);
    } else if (globals.pos[0][0] === 0 && !globals.ignore) {
      globals.ignore = true;
      globals.dirArr.push([0, 1], [1, 0]);
    } else {
      globals.ignore = false;
    }
  }
};
