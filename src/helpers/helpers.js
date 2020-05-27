// function to initialize empty grid with 0s
export function generateGrid(r, c) {
  const rows = [];

  for (let i = 0; i < r; i++) {
    rows.push(Array.from(Array(c), () => 0));
  }

  return rows;
}
