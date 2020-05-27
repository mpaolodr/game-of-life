import React from "react";

const Cell = (props) => {
  const { stateChange, grid, indexRow, indexCol, setGrid } = props;

  return (
    <div
      className="cell"
      onClick={() => stateChange(indexRow, indexCol, setGrid, grid)}
      style={{ backgroundColor: grid[indexRow][indexCol] ? "white" : "black" }}
    ></div>
  );
};

export default Cell;
