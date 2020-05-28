import React from "react";

const Features = (props) => {
  const { setColor, setCanvasColor, setDimension, running } = props;

  return (
    <div className="features">
      <form>
        <label htmlFor="color">Set Cell Color</label>
        <select
          name="color"
          onChange={(e) => {
            if (running === false) {
              setColor(e.target.value);
            }
          }}
        >
          <option value="black">Black</option>
          <option value="blue">Blue</option>
          <option value="pink">Pink</option>
          <option value="red">Red</option>
        </select>

        <label htmlFor="canvas-color">Set Canvas Color</label>
        <select
          name="canvas-color"
          onChange={(e) => {
            if (running === false) {
              setCanvasColor(e.target.value);
            }
          }}
        >
          <option value="gray">Gray</option>
          <option value="black">Black</option>
          <option value="blue">Blue</option>
        </select>

        <label htmlFor="dimension">Set Dimension</label>
        <select
          name="dimension"
          onChange={(e) => {
            if (running === false) {
              setDimension(e.target.value);
            }
          }}
        >
          <option value="60x60">60 x 60</option>
          <option value="50x50">50 x 50</option>
          <option value="40x40">40 x 40</option>
          <option value="30x30">30 x 30</option>
          <option value="20x20">20 x 20</option>
        </select>
      </form>

      <div className="rules">
        <h3 className="rules-heading">Rules:</h3>

        <p className="rules-desc">
          1. If a cell(individual square) is alive, it will die if it has 4 or
          more neighbors <span>OR</span> if it only has one or less neighbor
        </p>
        <p className="rules-desc">
          2. If a cell is dead, it will come to life if it has{" "}
          <span>EXACTLY</span> 3 alive neighbors
        </p>
      </div>
    </div>
  );
};

export default Features;
