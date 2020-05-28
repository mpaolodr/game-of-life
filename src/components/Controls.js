import React, { useState, useRef, useCallback } from "react";
import produce from "immer";

// helpers
import { generateGrid, generateRandom } from "../helpers/helpers.js";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const Controls = (props) => {
  const {
    setGrid,
    numRows,
    numCols,
    speed,
    speedUp,
    speedDown,
    running,
    setRunning,
  } = props;

  const [genCount, setGenCount] = useState(0);

  // create references to state variables
  const runningRef = useRef(running);
  const genCountRef = useRef(genCount);
  const speedRef = useRef(speed);
  const numRowsRef = useRef(numRows);
  const numColsRef = useRef(numCols);

  // refs so that values used by runSimulation function will always be updated even after running it once
  runningRef.current = running;
  genCountRef.current = genCount;
  speedRef.current = speed;
  numRowsRef.current = numRows;
  numColsRef.current = numCols;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRowsRef.current; i++) {
          for (let j = 0; j < numColsRef.current; j++) {
            let neighbors = 0;

            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;

              // check if index is not out of the grid system setup
              if (
                newI >= 0 &&
                newI < numRowsRef.current &&
                newJ >= 0 &&
                newJ < numColsRef.current
              ) {
                neighbors += g[newI][newJ];
              }
            });

            // rules
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setGenCount(genCountRef.current + 1);
    setTimeout(runSimulation, speedRef.current);
  }, []);

  // reset grid and generation counter
  const clearGrid = () => {
    setGrid(generateGrid(numRows, numCols));
    setGenCount(0);
  };

  // generate random cells
  const randomGrid = () => {
    setGrid(generateRandom(numRows, numCols));
  };

  return (
    <>
      <div className="interface">
        <div className="btn-container">
          <button
            onClick={() => {
              setRunning(!running);
              runningRef.current = true;
              runSimulation();
            }}
          >
            {running ? "Stop" : "Start"}
          </button>
          <button onClick={clearGrid}>Clear</button>
          <button onClick={randomGrid}>Random</button>
          <button onClick={speedUp}>Speed Up</button>
          <button onClick={speedDown}>Speed Down</button>
        </div>
        <p className="generation">Generation: {genCountRef.current}</p>
      </div>
    </>
  );
};

export default Controls;
