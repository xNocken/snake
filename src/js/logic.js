import globals from './globals';
import utils from './utils';

export default () => {
  const {
    pos,
    dir,
    arraySize,
    grid,
  } = globals;

  if (!utils.getSnackCount(grid)) {
    const x = Math.floor(Math.random() * arraySize);
    const y = Math.floor(Math.random() * arraySize);
    globals.grid[x][y] = 1;
  }

  globals.pos.unshift([
    (pos[0][0] + dir[0]) % arraySize,
    (pos[0][1] + dir[1]) % arraySize,
  ]);

  if (globals.snackCount < globals.pos.length - 1) {
    globals.pos.pop();
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
};
