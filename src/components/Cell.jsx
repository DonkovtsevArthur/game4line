import React from "react";

const Cell = ({ play, number, index }) => {
  let color = "white",
    cellBox = "cell-box";

  if (number === 1) {
    color = "red";
  } else if (number === 2) {
    color = "green";
  }

  return (
    <td>
      <div
        className="cell"
        onClick={() => {
          play(index);
        }}
      >
        <div className={cellBox + " " + color} />
      </div>
    </td>
  );
};

export default Cell;
