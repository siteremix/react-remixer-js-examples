import React, { useEffect } from "react";
import useRemixer from "../hooks/useRemixer";
import PlayButton from "../components/PlayButton";

const Remix = () => {
  const [refParent, remixH1] = useRemixer({
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

  useEffect(() => {
    remixH1?.run();
  }, [remixH1]);

  return (
    <div className="card row-column" key="animatation">
      <div ref={refParent}>
        <h1>Hello :)</h1>
        <h1>How are you ?</h1>
        <h1>Bye</h1>
      </div>
      <PlayButton
        onClick={() => {
          remixH1.run();
        }}
      />
    </div>
  );
};

export default Remix;
