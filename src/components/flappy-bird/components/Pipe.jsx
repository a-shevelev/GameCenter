import React, { useRef } from "react";
import { useSelector } from "react-redux";

export default function Pipe(props) {
  const { startPosition, pipes } = useSelector((state) => state.pipe);

  return (
    <>
      {pipes.map((pipe, i) => {
        return (
          <div key={i} style={{ position: "relative" }}>
            <div
              className="pipe-top"
              style={{
                left: startPosition.x + i * 300,
                height: pipe.height,
              }}
            ></div>

            <div
              className="pipe-bottom"
              style={{
                left: startPosition.x + i * 300,
                height: 600 - pipe.height,
                top: pipe.height + 150,
              }}
            ></div>
          </div>
        );
      })}
    </>
  );
}
