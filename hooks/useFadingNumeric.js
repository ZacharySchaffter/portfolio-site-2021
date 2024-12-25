import { useEffect, useRef, useState } from "react";

/**
 * Provided an integer, this custom hook continually modifies the value so that it approaches 0/
 * @param {Integer} value - initial value
 * @param {Integer} interval - interval of time (in milliseconds)
 * @param {Integer} falloff - amount to reduce in each tick
 */
function useFadingNumeric(value = 0, interval = 60, falloff = 50) {
  const [fadingValue, setFadingValue] = useState(value);

  // Update base fading value
  useEffect(() => {
    // If new values sign is different, get difference
    const valueIsPositive = value >= 0;
    const fadingValueIsPositive = fadingValue >= 0;

    if (valueIsPositive !== fadingValueIsPositive) {
      const direction = value > fadingValue ? -1 : 1;
      const netDiff = (Math.abs(value) + Math.abs(fadingValue)) / 2;
      setFadingValue(fadingValue - direction * netDiff);
    } else if (Math.abs(value) > Math.abs(fadingValue)) {
      setFadingValue(value);
    }
  }, [value]);

  // On fadingValue change, update interval
  useEffect(() => {
    if (fadingValue === 0) return;
    const reduce = setInterval(() => {
      const reduceBy =
        Math.abs(fadingValue) - falloff < 0 ? Math.abs(fadingValue) : falloff;
      const sign = fadingValue > 0 ? 1 : -1;
      setFadingValue(fadingValue - sign * reduceBy);
    }, interval);

    return () => {
      clearInterval(reduce);
    };
  }, [fadingValue]);

  return fadingValue;
}

export default useFadingNumeric;
