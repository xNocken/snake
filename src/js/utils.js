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

export default ({
  getSnackCount,
});
