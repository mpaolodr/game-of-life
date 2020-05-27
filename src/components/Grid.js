import React, { useState, useEffect } from "react";

// components
import Cell from "./Cell.js";
import Controls from "./Controls.js";
import Features from "./Features.js";

// helper functions
import { generateGrid, stateChange } from "../helpers/helpers.js";

const Grid = () => {
  // const numRows = 45;
  // const numCols = 45;

  const [dimension, setDimension] = useState("45x45");

  const numRows = parseInt(dimension.split("x")[0], 10);
  const numCols = parseInt(dimension.split("x")[1], 10);

  const [grid, setGrid] = useState(() => {
    return generateGrid(numRows, numCols);
  });

  const [speed, setSpeed] = useState(500);
  const [color, setColor] = useState("black");
  const [canvasColor, setCanvasColor] = useState("white");

  useEffect(() => {
    setGrid(generateGrid(numRows, numCols));
  }, [dimension]);

  // speed up function
  const speedUp = () => {
    if (speed > 100) {
      setSpeed(speed - 100);
    } else if (speed <= 100 && speed > 10) {
      setSpeed(speed - 10);
    } else {
      setSpeed(10);
    }
  };

  // speed down function

  const speedDown = () => {
    if (speed <= 1000) {
      setSpeed(speed + 100);
    } else {
      setSpeed(1000);
    }
  };

  return (
    <>
      <Features
        setColor={setColor}
        setCanvasColor={setCanvasColor}
        setDimension={setDimension}
      />
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
                color={color}
                canvasColor={canvasColor}
              />
            );
          });
        })}
      </div>
      <Controls
        setGrid={setGrid}
        numRows={numRows}
        numCols={numCols}
        speed={speed}
        speedUp={speedUp}
        speedDown={speedDown}
      />
    </>
  );
};

export default Grid;
