import React from "react";

const Cell = (props) => {
  const {
    stateChange,
    grid,
    indexRow,
    indexCol,
    setGrid,
    color,
    canvasColor,
  } = props;

  return (
    <div
      className="cell"
      onClick={() => stateChange(indexRow, indexCol, setGrid, grid)}
      style={{
        backgroundColor: grid[indexRow][indexCol] ? color : canvasColor,
      }}
    ></div>
  );
};

export default Cell;
