import React from "react";

import Cell from "./Cell";

const Row = ({ row, play }) => {
   
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell key={i} number={cell} index={i} play={play} />
      ))}
    </tr>
  );
};

export default Row;
