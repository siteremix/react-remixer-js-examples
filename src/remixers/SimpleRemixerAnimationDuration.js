import React, { useEffect, useState, useCallback } from "react";
// import Remixer from "@siteremix/remixer";
import useRemixer from "../hooks/useRemixer";
import PlayButton from "../components/PlayButton";
import PickleRick from "../images/pickle-rick.png";

const Remix = ({ initDuration = 1 }) => {
  const [duration, setDuration] = useState(initDuration);

  const [remixRef, remix, remixReset] = useRemixer();

  const runRemixer = useCallback(() => {
    if (!remix) {
      return;
    }
    const runUpdate = async () => {
      await remixReset();
      remix.animate('rotate', { duration }).run();
    };

    runUpdate();
  }, [remix, duration, remixReset]);

  useEffect(() => {
    runRemixer();
  }, [duration, runRemixer]);

  useEffect(() => {
    remix?.animate('rotate', { duration }).run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remix]);

  return (
    <div className="card row-column" key="animate">
      <div>
        <div className="select-row">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: "0 0 100%",
              alignItems: "center",
            }}
          >
            <div>
              <input
                style={{ width: 20  }}
                className="input"
                value={duration}
                onChange={(e) => setDuration(+e.target.value)}
              />
              {' '}
              <label>Duration</label>
            </div>
          </div>
        </div>
          <div id="pickle-rick2" ref={remixRef}>
            <img width="170px" src={PickleRick} alt="pickle" />
          </div>
      </div>
      <PlayButton onClick={runRemixer} />
    </div>
  );
};

export default Remix;
