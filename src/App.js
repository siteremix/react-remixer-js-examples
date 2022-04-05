import React, { useEffect, useState, useRef } from "react";
import Remixer from "@siteremix/remixer";
import Card from './components/Card';
import SimpleRemixerAnimation from "./remixers/SimpleRemixerAnimation";
import SelectRemixerAnimate from "./remixers/SelectRemixerAnimate";
import SelectRemixerAnimateIn from "./remixers/SelectRemixerAnimateIn";
import SimpleRemixerAnimationDisableAndEnable from "./remixers/SimpleRemixerAnimationDisableAndEnable";
import SimpleRemixerAnimationDuration from "./remixers/SimpleRemixerAnimationDuration";
import SimpleRemixerAnimationCustom from "./remixers/SimpleRemixerAnimationCustom";
import "./App.css";

const App = () => {
  const [hasBorder, setHasBorder] = useState(false);
  const [cardBackgroundColor, setCardBackgroundColor] = useState("#5a00a3");

  /*useEffect(() => {
    const remix = new Remixer(".card").styles({
      margin: "10px",
      padding: "10px",
      width: "300px",
      height: "300px",
      backgroundColor: cardBackgroundColor,
      borderRadius: "10px",
    });

    if(hasBorder) {
      remix.animateStyles(
        {
            border: "2px solid #909195",
            boxShadow: "0 0 4px 0 #909195",
        },
        { duration: "1s" }
      );
    }

    remix.run();
  }, [hasBorder, cardBackgroundColor]);*/

  const addBorderToCards = () => {
    setHasBorder(!hasBorder);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="button" onClick={addBorderToCards}>
          {hasBorder ? "Remove border from cards" : "Add border to cards"}
        </button>

        <input
          onChange={({ target }) => setCardBackgroundColor(target.value)}
          className="color-picker"
          type="color"
          id="favcolor"
          name="favcolor"
          value={cardBackgroundColor}
        ></input>
      </div>
      <div className="cards-row">
        <Card hasBorder={hasBorder} backgroundColor={cardBackgroundColor}>
          <SimpleRemixerAnimation />
        </Card>
        <Card hasBorder={hasBorder} backgroundColor={cardBackgroundColor}>
          <SelectRemixerAnimate name="animate1" option="flipY" />
        </Card>
        <Card hasBorder={hasBorder} backgroundColor={cardBackgroundColor}>
          <SelectRemixerAnimate name="animate2" />
        </Card>
        <Card hasBorder={hasBorder} backgroundColor={cardBackgroundColor}>
          <SelectRemixerAnimateIn />
        </Card>
        <Card hasBorder={hasBorder} backgroundColor={cardBackgroundColor}>
          <SimpleRemixerAnimationDisableAndEnable />
        </Card>
        <Card hasBorder={hasBorder} backgroundColor={cardBackgroundColor}>
          <SimpleRemixerAnimationDuration />
        </Card>
        <Card hasBorder={hasBorder} backgroundColor={cardBackgroundColor}>
          <SimpleRemixerAnimationCustom />
        </Card>
      </div>
    </div>
  );
};

export default App;
