import { useState, useEffect, useCallback } from "react";

type Dimensions = {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

const defaultDimensions: Dimensions = {
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

/**
 * Custom hook to return dimension/positioning data for a node
 */
const useDimensions = (node: HTMLElement | null) => {
  const [dimensions, setDimensions] = useState<Dimensions>(defaultDimensions);

  useEffect(() => {
    // Update node dimensions stored in state
    const updateSizing = () => {
      if (!node) return;
      window.requestAnimationFrame(() =>
        setDimensions(node.getBoundingClientRect().toJSON())
      );
    };
    updateSizing(); // call one on initial load

    window.addEventListener("resize", updateSizing);
    window.addEventListener("scroll", updateSizing);

    return () => {
      window.removeEventListener("resize", updateSizing);
      window.removeEventListener("scroll", updateSizing);
    };
  }, [node]);

  return dimensions;
};

export default useDimensions;
