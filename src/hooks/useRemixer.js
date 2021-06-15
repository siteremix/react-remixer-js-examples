import { useRef, useCallback, useEffect, useState } from "react";
import Remixer from "@siteremix/remixer";

export { Remixer };

const useRemixer = (opt = {}) => {
  const refElement = useRef(null);
  const [remix, setRemix] = useState(null);
  const options = Object.assign({}, {}, opt);

  const createRemix = useCallback(() => {
    const element = refElement.current;
    if (!remix) {
      if (!options.remix) {
        options.remix = {
          selector: element,
        };
      } else {
        options.remix.selector = options.remix?.selector
          ? options.remix.selector
          : element;
      }
      console.log("options", options);
      const r = Remixer.fromJS(options);
      setRemix(r);
    }
  }, [refElement, remix, options]);

  const resetRemix = useCallback(
    async (cb) => {
      if (remix) {
        await remix;

        if (cb) {
          remix.reset(cb);
        } else {
          return remix.reset();
        }
      }
    },
    [remix]
  );

  useEffect(() => {
    const element = refElement.current;
    if (!element && remix) {
      remix._removeRemix();
      setRemix(null);
      return;
    }
    if (element) {
      createRemix();
    }
  }, [createRemix, refElement, remix]);

  return [refElement, remix, resetRemix];
};

export default useRemixer;
