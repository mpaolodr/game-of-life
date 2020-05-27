import produce from "immer";

// function to initialize empty grid with 0s
export function generateGrid(r, c) {
  const rows = [];

  for (let i = 0; i < r; i++) {
    rows.push(Array.from(Array(c), () => 0));
  }

  return rows;
}

export function generateRandom(r, c) {
  const rows = [];

  for (let i = 0; i < r; i++) {
    rows.push(Array.from(Array(c), () => (Math.random() > 0.8 ? 1 : 0)));
  }

  return rows;
}

export function stateChange(rowIndex, colIndex, cb, grid) {
  const newGrid = produce(grid, (gridCopy) => {
    gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
  });

  cb(newGrid);
}
