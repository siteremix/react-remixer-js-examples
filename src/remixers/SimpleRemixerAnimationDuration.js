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
      remix.animate('rotate', { duration: duration + 's' }).run();
    };

    runUpdate();
  }, [remix, duration, remixReset]);

  useEffect(() => {
    runRemixer();
  }, [duration, runRemixer]);

  useEffect(() => {
    remix?.animate('rotate', { duration: duration + 's' }).run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remix]);

  function handleChangeDuration(e) {
    const value = +e.target.value;
    if (!isNaN(value) && value > 0) {
      setDuration(value);
    }
  }

  return (
    <>
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
                style={{ width: 60  }}
                min={1}
                step="1"
                type="number"
                className="input"
                value={duration}
                onChange={handleChangeDuration}
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
    </>
  );
};

export default Remix;
