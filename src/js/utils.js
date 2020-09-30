const getSnackCount = (grid) => {
  let snackCount = 0;

  grid.forEach((row) => {
    row.forEach((field) => {
      if (field === 1) {
        snackCount += 1;
      }
    });
  });

  return snackCount;
};

const getEmptyFields = (pos, grid) => {
  const { length } = grid;
  let fields = [];

  for (let i = 0; i < length; i += 1) {
    for (let y = 0; y < length; y += 1) {
      fields.push([i, y]);
    }
  }

  pos.forEach((bodyPos) => {
    fields = fields.filter(value => !(bodyPos[0] === value[0] && bodyPos[1] === value[1]) && !grid[value[1]][value[0]]);
  });

  return fields;
};

export default ({
  getSnackCount,
  getEmptyFields,
});
