import { createContext, useContext, useEffect, useState } from "react";
import useDimensions from "/components/hooks/useDimensions";

const ParallaxContext = createContext();

// Provider, should wrap heighest level parent component
const ParallaxProvider = ({ children }) => {
  // STATE
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  // LIFECYCLE
  useEffect(() => {
    const update = () => {
      if (!window) return;
      window.requestAnimationFrame(() => {
        setWindowHeight(window.innerHeight);
        setScrollY(window.scrollY);
      });
    };

    // Bind handlers
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update);

    return () => {
      // Unbind handlers
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  });

  return (
    <ParallaxContext.Provider
      value={{
        scrollY,
        windowHeight,
      }}
    >
      {children}
    </ParallaxContext.Provider>
  );
};

// Render props component to inject additional data
const Parallax = ({ render, children }) => {
  const [{ top, height }, node, assignNode] = useDimensions();
  const { scrollY, windowHeight } = useContext(ParallaxContext);

  const offsetTop = top;
  const offsetCenter = top + 0.5 * height - 0.5 * windowHeight;
  const offsetBottom = windowHeight - (top + height);
  const offset = {
    top: {
      px: offsetTop,
      percent: offsetTop / windowHeight,
    },
    center: {
      px: offsetCenter,
      percent: offsetCenter / windowHeight,
    },
    bottom: {
      px: offsetBottom,
      percent: offsetBottom / windowHeight,
    },
  };

  // If provided a render method, render it and pass along state.
  // Otherwise, render whatever children were provided.
  return <div ref={assignNode}>{render ? render({ offset }) : children}</div>;
};

export { ParallaxProvider, Parallax };
