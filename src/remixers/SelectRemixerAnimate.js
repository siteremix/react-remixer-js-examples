import React, { useEffect, useState, useCallback } from "react";
// import Remixer from "@siteremix/remixer";
import useRemixer from "../hooks/useRemixer";
import PlayButton from "../components/PlayButton";
import PickleRick from "../images/pickle-rick.png";

const CheckItem = ({ name, checkedItem, onChange, text }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checkedItem}
        onChange={onChange}
      />
      <label htmlFor={name}>{text}</label>
    </div>
  );
};

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

const Remix = ({ option, name }) => {
  const [selected, setSelected] = useState(option || options[0]);
  const [show, setShow] = useState(true);

  const [remixRef, remix, remixReset] = useRemixer();

  const runRemixer = useCallback(() => {
    if (!remix) {
      return;
    }
    const runUpdate = async () => {
      await remixReset();
      remix.animate(selected, { duration: 1 }).run();
    };

    runUpdate();
  }, [remix, selected, remixReset]);

  useEffect(() => {
    runRemixer();
  }, [selected, runRemixer]);

  useEffect(() => {
    remix?.animate(selected, { duration: 1 }).run();
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
            <select
              name="items"
              id="items"
              value={selected}
              className="select-dropdown"
              onChange={({ target }) => setSelected(target.value)}
            >
              {options.map((op) => (
                <option value={op} key={op}>
                  {op}
                </option>
              ))}
            </select>
            <CheckItem
              checkedItem={show}
              name={name}
              onChange={() => setShow(!show)}
              text="Show/Hide"
            />
          </div>
        </div>
        {show && (
          <div id="pickle-rick" ref={remixRef}>
            <img width="170px" src={PickleRick} alt="pickle" />
          </div>
        )}
      </div>
      <PlayButton onClick={runRemixer} />
    </div>
  );
};

export default Remix;
