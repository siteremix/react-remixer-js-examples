import React, { useEffect, useState, useCallback } from "react";
import Remixer from "@siteremix/remixer";
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

  const runRemixer = useCallback(() => {
    new Remixer("#mr-poopy")
      .animateIn(selected, { duration: 1 })
      .animateOut(selected, { duration: 1 })
      .run();
  }, [selected]);

  useEffect(() => {
    runRemixer();
  }, [selected, runRemixer]);

  return (
    <div className="card row-column" key="animateIn">
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
        <div id="mr-poopy">
          <img width="170px" src={MrPoopy} alt="poopy" />
        </div>
      </div>
      <PlayButton onClick={runRemixer} />
    </div>
  );
};

export default Remix;
