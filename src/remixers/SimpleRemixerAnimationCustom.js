import React, { useEffect, useState, useCallback } from "react";
// import Remixer from "@siteremix/remixer";
import useRemixer from "../hooks/useRemixer";
import PlayButton from "../components/PlayButton";
import PickleRick from "../images/pickle-rick.png";

const optionsAnimate = [
    "scaleUp",
    "scaleDown",
    "scaleRotateUp",
    "scaleRotateDown",
];

const optionsDirect = [
    "scaleFrom",
    "scaleMiddle",
    "scaleTo",
];

const Remix = ({ initValue = 0 }) => {
  const [value, setValue] = useState(initValue);
  const [selectedAnimate, setSelectedAnimate] = useState(optionsAnimate[0]);
  const [selectedDirect, setSelectedDirect] = useState(optionsDirect[0]);
  const [showHelp, setShowHelp] = useState(false);
  const [remixRef, remix, remixReset] = useRemixer();

  const runRemixer = useCallback(() => {
    if (!remix) {
      return;
    }

    const runUpdate = async () => {
      await remixReset();
      remix.animate(selectedAnimate, { [selectedDirect]: value }).run();
    };

    runUpdate();
  }, [remix, remixReset, value, selectedAnimate, selectedDirect]);

  useEffect(() => {
    runRemixer();
  }, [remix, runRemixer, value, selectedAnimate, selectedDirect]);

  useEffect(() => {
      remix?.animate(selectedAnimate, { [selectedDirect]: value }).run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remix]);

  function handleChangeValue(e) {
    const v = +e.target.value;
    if (!isNaN(v)) {
      if(
        (selectedAnimate === 'scaleUp' || selectedAnimate === 'scaleDown')
        && selectedDirect === 'scaleFrom'
        && v === 1
      ){
        setValue(1.1);
        setShowHelp(true);
      } else {
        setValue(v);
      }
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
              flex: "0 0 30%",
              alignItems: "center",
            }}
          >
            <select
              style={{ width: 100 }}
              name="items"
              id="items"
              value={selectedAnimate}
              className="select-dropdown"
              onChange={({ target }) => setSelectedAnimate(target.value)}
            >
              {optionsAnimate.map((op) => (
                <option value={op} key={op}>
                  {op}
                </option>
              ))}
            </select>

            <select
              style={{ marginLeft: 7 }}
              name="items"
              id="items"
              value={selectedDirect}
              className="select-dropdown"
              onChange={({ target }) => setSelectedDirect(target.value)}
            >
              {optionsDirect.map((op) => (
                <option value={op} key={op}>
                  {op}
                </option>
              ))}
            </select>

            <div
              style={{ marginLeft: 7 }}
            >
              <input
                style={{ width: 60  }}
                type="number"
                className="input"
                value={value}
                onChange={handleChangeValue}
              />
              {showHelp && (
                <div style={{
                  position: 'absolute',
                  zIndex: 1,
                  maxWidth: 200,
                  color: '#f92323',
                  backgroundColor: '#ffffff',
                }}>
                  <button
                    onClick={() => setShowHelp(false)}
                    style={{ position: 'absolute', right: 10, top: 5 }}
                  >
                    X
                  </button>
                  <p>Для выбранных параметров значение не может быть равно '1'</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="pickle-rick3" ref={remixRef}>
          <img width="170px" src={PickleRick} alt="pickle" />
        </div>
      </div>
      <PlayButton onClick={runRemixer} />
    </>
  );
};

export default Remix;
