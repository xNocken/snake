import $ from 'jquery';
import globals from './globals';

export default () => {
  const canvas = $('#canvas')[0];
  const context = canvas.getContext('2d');

  const {
    fps,
    tps,
    fieldSize,
    grid,
    pos,
  } = globals;

  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.fillStyle = '#000';
  context.font = '10px serif';
  context.fillText(`FPS: ${fps}`, 10, 10);
  context.fillText(`TPS: ${tps}`, 10, 25);

  grid.forEach((row, rowIndex) => {
    row.forEach((field, fieldIndex) => {
      if (field === 1) {
        context.beginPath();
        context.fillStyle = 'yellow';
        context.fillRect(fieldIndex * fieldSize, 40 + (rowIndex * fieldSize), fieldSize, fieldSize);
        context.stroke();
      }
    });
  });

  context.fillStyle = '#000';
  pos.forEach((bodyPos) => {
    context.fillRect(bodyPos[0] * fieldSize, 40 + (bodyPos[1] * fieldSize), fieldSize, fieldSize);
  });
};
