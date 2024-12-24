"use client";

import {
  ComponentProps,
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useDimensions from "@/hooks/useDimensions";

type ParallaxContextType = {
  scrollY: number;
  windowHeight: number;
};

const ParallaxContext = createContext<ParallaxContextType>({
  scrollY: 0,
  windowHeight: 0,
});

// Provider, should wrap heighest level parent component
const ParallaxProvider: React.FC<PropsWithChildren> = ({ children }) => {
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

  const ctx = useMemo(
    () => ({
      scrollY,
      windowHeight,
    }),
    [scrollY, windowHeight]
  );

  return (
    <ParallaxContext.Provider value={ctx}>{children}</ParallaxContext.Provider>
  );
};

type ComputedOffset = {
  px: number;
  percent: number;
};

type WithParallaxInjectedProps = {
  scrollY: number;
  windowHeight: number;
  offset: {
    top: ComputedOffset;
    center: ComputedOffset;
    bottom: ComputedOffset;
  };
};

type WithParallaxProps<P extends Record<string, unknown>> = {
  render?: (props: WithParallaxInjectedProps & P) => ReactNode;
  children?: ReactNode;
} & P;

const WithParallax = <T extends React.ComponentType<any>>({
  render,
  children,
  ...props
}: WithParallaxProps<ComponentProps<T>>): ReactNode => {
  const ref = useRef<HTMLDivElement>(null);
  const { top, height } = useDimensions(ref.current);
  const { scrollY, windowHeight } = useContext(ParallaxContext);

  // Calculate offsets
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

  return (
    <div ref={ref}>
      {render ? render({ offset, scrollY, windowHeight, ...props }) : children}
    </div>
  );
};

export { ParallaxProvider, WithParallax };
