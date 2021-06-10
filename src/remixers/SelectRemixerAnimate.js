import React, { useEffect, useState, useCallback } from "react";
import Remixer from "@siteremix/remixer";
import PlayButton from "../components/PlayButton";
import PickleRick from "../images/pickle-rick.png";

const options = [
  "tada",
  "flipX",
  "flipY",
  "flipScale",
  "slideLeft",
  "slideRight",
  "slideUp",
  "slideDown",
  "scaleUp",
  "scaleDown",
  "scaleRotateUp",
  "scaleRotateDown",
  "rotate",
  "rotateScaleUp",
  "rotateScaleDown",
  "rotateClock",
  "rotateDiagonal",
  "swingUp",
  "swingDown",
  "bounceUp",
  "bounceDown",
  "bounceLeft",
  "bounceRight",
  "bounceScaleUp",
  "bounceScaleDown",
  "rollLeft",
  "rollRight",
];

const Remix = () => {
  const [selected, setSelected] = useState(options[0]);

  const runRemixer = useCallback(() => {
    new Remixer("#pickle-rick").animate(selected, { duration: 1 }).run();
  }, [selected]);

  useEffect(() => runRemixer(), [selected, runRemixer]);

  return (
    <div className="card row-column" key="animate">
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
        <div id="pickle-rick">
          <img width="170px" src={PickleRick} alt="pickle" />
        </div>
      </div>
      <PlayButton onClick={runRemixer} />
    </div>
  );
};

export default Remix;
