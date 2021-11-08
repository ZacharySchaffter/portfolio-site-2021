import { useState, useEffect, useCallback } from "react";

const defaultDimensions = {
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

/**
 * Custom hook that returns dimension/positioning data for a node.
 * Index 1 is an assignment that leverages useCallback to store a
 * dynamic reference to the node being measured.
 */
const useDimensions = () => {
  const [node, setNode] = useState(null); // because we can't use `ref.current` as a useEffect dependency, we're storing the node as a state variable
  const assignNode = useCallback((node) => {
    setNode(node); // store reference to DOM node in state
  }, []); // use callback to measure node https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node

  const [dimensions, setDimensions] = useState(defaultDimensions);

  // Bind resize handler to update dimensions
  useEffect(() => {
    // Update node dimensions stored in state
    const updateSizing = () => {
      if (!node) return;
      setDimensions(node.getBoundingClientRect().toJSON());
    };
    updateSizing(); // call one on initial load

    window.addEventListener("resize", updateSizing);

    return () => {
      window.removeEventListener("resize", updateSizing);
    };
  }, [node]);

  // Return [dimensionData, ndeSetter]
  // Careful!  Because this returns a new object everytime, a useEffect will see
  // it as a new value + force a re-render. Be selective when watching it!
  return [dimensions, node, assignNode];
};

export default useDimensions;
