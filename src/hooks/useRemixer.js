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
      const r = new Remixer(options);
      setRemix(r);
    }
  }, [refElement, remix, options]);

  const resetUpdateRemix = useCallback(
    async (cb) => {
      if (typeof cb === "object" && cb != null && remix) {
        const element = refElement.current;
        await remix.reset();
        if (!cb.remix) {
          cb.remix = {
            selector: element,
          };
        } else {
          cb.remix.selector = cb.remix?.selector ? cb.remix.selector : element;
        }
        return remix.fromJS(cb);
      }
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

  return [refElement, remix, resetUpdateRemix];
};

export default useRemixer;
