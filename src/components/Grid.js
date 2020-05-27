import React, { useState } from "react";

// components
import Cell from "./Cell.js";
import Controls from "./Controls.js";

// helper functions
import { generateGrid, stateChange } from "../helpers/helpers.js";

const Grid = () => {
  const numRows = 40;
  const numCols = 40;

  const [grid, setGrid] = useState(() => {
    return generateGrid(numRows, numCols);
  });

  return (
    <>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${numCols}, 15px)` }}
      >
        {grid.map((row, i) => {
          return row.map((col, j) => {
            return (
              <Cell
                key={`cell${i}${j}`}
                indexRow={i}
                indexCol={j}
                stateChange={stateChange}
                grid={grid}
                setGrid={setGrid}
              />
            );
          });
        })}
      </div>
      <Controls setGrid={setGrid} numRows={numRows} numCols={numCols} />
    </>
  );
};

export default Grid;
