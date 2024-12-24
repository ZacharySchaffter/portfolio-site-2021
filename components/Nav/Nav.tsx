"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./Nav.module.scss";
import { usePathname } from "next/navigation";
import { Logo } from "@/icons";

type Props = {
  isInverted: boolean;
  setIsInverted: (state: boolean) => void;
};

const navItems = [
  { title: "Work", path: "/" },
  { title: "About", path: "/about" },
];

const Nav: React.FC<Props> = ({ isInverted, setIsInverted }) => {
  const pathname = usePathname();
  const observer = useRef<IntersectionObserver>(null);

  // initialize an intersection observer to catch scroll events that cause the
  // nav to overlap the nav with any module where the colors should invert
  // themselves
  const initObserver = useCallback(() => {
    const scrollRoot = document.documentElement;
    let prevScrollTop = 0;
    setIsInverted(false);

    // Disconnect observer if it exists
    observer?.current && observer.current.disconnect();

    // Intersection handler
    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      let direction;
      if (scrollRoot.scrollTop > prevScrollTop) {
        direction = "down";
      } else {
        direction = "up";
      }
      prevScrollTop = scrollRoot.scrollTop;

      const entry =
        direction === "up" ? entries[0] : entries[entries.length - 1];

      const node = entry.target;

      // @ts-expect-error - TODO: debug why TS is whining about node.dataset
      if (entry.isIntersecting && node.dataset.invertHeader === "true") {
        setIsInverted(true);
      } else {
        setIsInverted(false);
      }
    };

    // Update stored ref for subsequent renders
    // Leave only a sliver (.1%) to intersect on, to limit the times
    // multiple sections are 'intersecting' simultaneously
    observer.current = new IntersectionObserver(onIntersect, {
      threshold: 0,
      rootMargin: "-0.9% 0px -99% 0px",
    });

    // Watch all nodes with [data-invert-header] attr
    const headerInteractionNodes = document.querySelectorAll(
      "[data-invert-header]"
    );
    headerInteractionNodes.forEach((node) => {
      observer?.current?.observe(node);
    });
  }, [setIsInverted]);

  // Onload, and then anytime the path changes, recreate the
  // observer to watch the new sections
  useEffect(() => {
    initObserver();
    return () => {
      observer?.current && observer?.current?.disconnect();
    };
  }, [initObserver, pathname]);

  return (
    <div
      className={clsx(styles["site-nav"], {
        [styles["site-nav--inverted"]]: isInverted,
      })}
    >
      <nav>
        <ul className="list-unstyled">
          {navItems.map((item, i) => (
            <li
              key={i}
              className={clsx({ [styles["active"]]: pathname === item.path })}
            >
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles["site-nav__logo"]}>
        <Link href="/">
          <Logo color={isInverted ? "#FFF" : "#000"} />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
