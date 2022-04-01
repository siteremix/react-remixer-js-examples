import React, { useEffect, useState, useCallback } from "react";
import useRemixer from "../hooks/useRemixer";
import PlayButton from "../components/PlayButton";
import MrPoopy from "../images/mr-poopy-butthole.png";

const options = [
  "fade",
  "fadeLeft",
  "fadeRight",
  "fadeUp",
  "fadeDown",
  "tada",
  "rotate",
  "flipScale",
  "swingUp",
  "bounceUp",
  "rollRight",
];

const Remix = () => {
  const [selected, setSelected] = useState(options[0]);
  const [remixRef, remix, remixReset] = useRemixer();

  const runRemixer = useCallback(() => {
    if (!remix) {
      return;
    }
    const runUpdate = async () => {
      await remixReset();
      remix
        .animateIn(selected, { duration: 1 })
        .animateOut(selected, { duration: 1 })
        .run();
    };

    runUpdate();
  }, [remix, selected, remixReset]);

  useEffect(() => {
    remix
      ?.animateIn(selected, { duration: 1 })
      .animateOut(selected, { duration: 1 })
      .run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remix]);

  useEffect(() => {
    runRemixer();
  }, [selected, runRemixer]);

  return (
    <>
      <div>
        <div className="select-row">
          <select
            name="items"
            id="items"
            className="select-dropdown"
            onChange={({ target }) => setSelected(target.value)}
          >
            {options.map((op) => (
              <option value={op} key={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
        <div ref={remixRef} className="poopy">
          <img width="170px" src={MrPoopy} alt="poopy" />
        </div>
      </div>
      <PlayButton onClick={runRemixer} />
    </>
  );
};

export default Remix;
