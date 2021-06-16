import React, { useEffect, useCallback } from "react";
import useRemixer from "../hooks/useRemixer";
import PlayButton from "../components/PlayButton";

const Remix = () => {
  const [refParent, remix, remixUpdate] = useRemixer({
    remix: {
      selector: "h1",
    },
    steps: [
      {
        type: "animate",
        params: "scaleUp",
        options: { duration: "3s" },
      },
      {
        type: "animate",
        params: "tada",
        options: { duration: "3s" },
      },
    ],
  });

  const runRemixer = useCallback(async () => {
    if (!remix) {
      return;
    }

    remixUpdate({
      remix: { selector: refParent.current },
      steps: [
        {
          type: "animate",
          params: "tada",
          options: { duration: "3s" },
        },
        {
          type: "animate",
          params: "scaleUp",
          options: { duration: "3s" },
        },
      ],
      run: {},
    });
  }, [remix, remixUpdate, refParent]);

  useEffect(() => {
    remix?.run();
  }, [remix]);

  return (
    <div className="card row-column" key="animatation">
      <div ref={refParent}>
        <h1>Hello :)</h1>
        <h1>How are you ?</h1>
        <h1>Bye</h1>
      </div>
      <PlayButton
        onClick={() => {
          runRemixer();
        }}
      />
    </div>
  );
};

export default Remix;
