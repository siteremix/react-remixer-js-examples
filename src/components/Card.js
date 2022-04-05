import React, { useCallback, useEffect, useRef } from "react";
import useRemixer from "../hooks/useRemixer";

const Card = ({ hasBorder, backgroundColor, children }) => {
  const [remixRef, remix, remixReset] = useRemixer();
  const debounceTimeout = useRef();

  const runRemixer = useCallback(() => {
    if (!remix) {
      return;
    }
    const runUpdate = async () => {
      await remixReset();
      remix.styles({
        margin: "10px",
        padding: "10px",
        width: "300px",
        height: "300px",
        backgroundColor: backgroundColor,
        borderRadius: "10px",
      });

      if (hasBorder) {
        remix.animateStyles(
          {
            border: "2px solid #909195",
            boxShadow: "0 0 4px 0 #909195",
          },
          { duration: "1s" }
        );
      }

      remix.run();
    };

    runUpdate();
  }, [remixRef, remix, remixReset, hasBorder, backgroundColor]);

  useEffect(() => {
    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      runRemixer();
    }, 100);
  }, [hasBorder, backgroundColor, runRemixer]);

  return (<div ref={remixRef} className="card row-column">
    {children}
  </div>)
}

export default Card;
