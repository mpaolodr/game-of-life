import React, { useState, useEffect } from "react";

// components
import Cell from "./Cell.js";
import Controls from "./Controls.js";
import Features from "./Features.js";

// helper functions
import { generateGrid, stateChange } from "../helpers/helpers.js";

const Grid = () => {
  const [dimension, setDimension] = useState("60x60");

  const numRows = parseInt(dimension.split("x")[0], 10);
  const numCols = parseInt(dimension.split("x")[1], 10);

  // set grid
  const [grid, setGrid] = useState(() => {
    return generateGrid(numRows, numCols);
  });

  // default settings
  const [speed, setSpeed] = useState(500);
  const [color, setColor] = useState("black");
  const [canvasColor, setCanvasColor] = useState("gray");
  const [running, setRunning] = useState(false);

  // reset grid when user changes dimension
  useEffect(() => {
    setGrid(generateGrid(numRows, numCols));
  }, [dimension]);

  // speed up function
  // decrease number of milliseconds getting passed to setTimeout function
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
  // increase number of milliseconds to slow down animation
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
        running={running}
      />
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${numCols}, 10px)` }}
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
                running={running}
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
        running={running}
        setRunning={setRunning}
      />
    </>
  );
};

export default Grid;
