import React, { useEffect, useCallback } from "react";
import useRemixer from "../hooks/useRemixer";
import PlayButton from "../components/PlayButton";

const Remix = () => {
  const [refParent, remix, remixUpdate] = useRemixer({
    remix: {
      selector: "h1",
      delayEach: 0.3,
      hideBefore: true,
    },
    steps: [
      {
        type: "animateIn",
        params: "scaleUp",
        options: { duration: "3s" },
      },
      {
        type: "animate",
        params: "tada",
        options: { duration: "3s", showAfter: true },
      },
    ],
  });

  const runRemixer = useCallback(async () => {
    if (!remix) {
      return;
    }

    await remix.changeSelector({ selector: refParent.current });
    remixUpdate({
      remix: {
        // hideBefore: false,
        showBefore: true,
      },
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
    console.log(remix);
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
