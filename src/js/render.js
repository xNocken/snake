import $ from 'jquery';
import globals from './globals';
import utils from './utils';

export default () => {
  const canvas = $('#canvas')[0];
  const context = canvas.getContext('2d');

  const {
    fps,
    tps,
    fieldSize,
    arraySize,
    grid,
    pos,
  } = globals;

  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.fillStyle = '#000';
  context.font = '10px serif';
  context.fillText(`FPS: ${fps}`, 10, 10);
  context.fillText(`TPS: ${tps}`, 10, 25);

  context.fillStyle = '#000';

  pos.forEach((bodyPos, index) => {
    if (index === 0) {
      context.beginPath();
      switch (true) {
        case globals.posDir[0][0] === 0 && globals.posDir[0][1] === 1:
          // Up
          context.moveTo((bodyPos[0] * fieldSize) + 5, 40 + (bodyPos[1] * fieldSize));
          context.lineTo((bodyPos[0] * fieldSize) + fieldSize - 5, 40 + (bodyPos[1] * fieldSize));
          context.lineTo((bodyPos[0] * fieldSize) + (fieldSize / 2), (40 + (bodyPos[1] * fieldSize)) + fieldSize);
          break;

        case globals.posDir[0][0] === 0 && globals.posDir[0][1] === -1:
          // Down
          context.moveTo((bodyPos[0] * fieldSize) + 5, (40 + (bodyPos[1] * fieldSize)) + fieldSize);
          context.lineTo((bodyPos[0] * fieldSize) + fieldSize - 5, (40 + (bodyPos[1] * fieldSize)) + fieldSize);
          context.lineTo((bodyPos[0] * fieldSize) + (fieldSize / 2), (40 + (bodyPos[1] * fieldSize)));
          break;

        case globals.posDir[0][0] === 1 && globals.posDir[0][1] === 0:
          // Right
          context.moveTo((bodyPos[0] * fieldSize), (40 + (bodyPos[1] * fieldSize)) + 5);
          context.lineTo((bodyPos[0] * fieldSize) + fieldSize, (40 + (bodyPos[1] * fieldSize)) + (fieldSize / 2));
          context.lineTo((bodyPos[0] * fieldSize), (40 + (bodyPos[1] * fieldSize) + fieldSize - 5));
          break;

        case globals.posDir[0][0] === -1 && globals.posDir[0][1] === 0:
          // Left
          context.moveTo((bodyPos[0] * fieldSize) + fieldSize, (40 + (bodyPos[1] * fieldSize)) + 5);
          context.lineTo((bodyPos[0] * fieldSize), (40 + (bodyPos[1] * fieldSize)) + (fieldSize / 2));
          context.lineTo((bodyPos[0] * fieldSize) + fieldSize, (40 + (bodyPos[1] * fieldSize) + fieldSize - 5));
          break;
        default:
          context.moveTo((bodyPos[0] * fieldSize), (40 + (bodyPos[1] * fieldSize)) + 5);
          context.lineTo((bodyPos[0] * fieldSize) + fieldSize, (40 + (bodyPos[1] * fieldSize)) + (fieldSize / 2));
          context.lineTo((bodyPos[0] * fieldSize), (40 + (bodyPos[1] * fieldSize) + fieldSize - 5));
      }
      context.fill();
    } else if (globals.posDir[index][0] === 0) {
      context.fillRect((bodyPos[0] * fieldSize) + 5, 40 + (bodyPos[1] * fieldSize), fieldSize - 10, fieldSize);
    } else {
      context.fillRect((bodyPos[0] * fieldSize), 40 + (bodyPos[1] * fieldSize) + 5, fieldSize, fieldSize - 10);
    }
  });

  if (globals.debug) {
    context.fillStyle = 'blue';
    utils.getEmptyFields(globals.pos, globals.grid).forEach(([x, y]) => {
      context.fillRect(x * fieldSize, 40 + (y * fieldSize), fieldSize, fieldSize);
    });
  }

  grid.forEach((row, rowIndex) => {
    row.forEach((field, fieldIndex) => {
      if (field === 1) {
        context.beginPath();
        context.fillStyle = 'yellow';
        context.ellipse((fieldIndex * fieldSize) + fieldSize / 2, 40 + (rowIndex * fieldSize) + fieldSize / 3, fieldSize / 3, fieldSize / 3, Math.PI / 4, 0, 2 * Math.PI);
        context.fill();
      }

      if (globals.debug) {
        context.fillStyle = 'red';
        context.fillText(`${rowIndex} ${fieldIndex}`, fieldIndex * fieldSize, 40 + (rowIndex * fieldSize));
      }
    });
  });

  context.beginPath();
  context.rect(1, 40, fieldSize * arraySize, fieldSize * arraySize);
  context.stroke();
};
