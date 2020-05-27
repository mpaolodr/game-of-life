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
  const { setGrid, numRows, numCols } = props;

  const [running, setRunning] = useState(false);
  const [genCount, setGenCount] = useState(0);

  const runningRef = useRef(running);
  const genCountRef = useRef(genCount);

  runningRef.current = running;
  genCountRef.current = genCount;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;

            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;

              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
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
    setTimeout(runSimulation, 50);
  }, []);

  const clearGrid = () => {
    setGrid(generateGrid(numRows, numCols));
    setGenCount(0);
  };

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
        </div>
        <p className="generation">Generation: {genCountRef.current}</p>
      </div>
    </>
  );
};

export default Controls;
