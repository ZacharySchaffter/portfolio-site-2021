import Link from "next/link";
import styles from "./Nav.module.scss";
import { useRouter } from "next/router";
import { Logo } from "/components/icons";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default ({ invert, setInvert }) => {
  const { pathname } = useRouter();
  const { current: observer } = useRef(null);
  const items = [
    { title: "Work", path: "/" },
    { title: "About", path: "/about" },
  ];

  const initObserver = () => {
    const scrollRoot = document.documentElement;
    let prevScrollTop = 0;
    setInvert(false);

    // Disconnect observer if it exists
    observer && observer.disconnect();

    // Intersection handler
    const onIntersect = (entries, observer) => {
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

      if (entry.isIntersecting && node.dataset.invertHeader === "true") {
        setInvert(true);
      } else {
        setInvert(false);
      }
    };

    // Update stored ref for subsequent renders
    // Leave only a sliver (.1%) to intersect on, to limit the times
    // multiple sections are 'intersecting' simultaneously
    observer = new IntersectionObserver(onIntersect, {
      threshold: 0,
      rootMargin: "-0.9% 0px -99% 0px",
    });

    // Watch all nodes with [data-invert-header] attr
    const headerInteractionNodes = document.querySelectorAll(
      "[data-invert-header]"
    );
    headerInteractionNodes.forEach((node) => {
      observer.observe(node);
    });
  };

  // Onload, and then anytime the path changes, recreate the
  // observer to watch the new sections
  useEffect(() => {
    initObserver();

    return () => {
      observer && observer.disconnect();
    };
  }, [pathname]);

  return (
    <div
      className={clsx(styles["site-nav"], {
        [styles["site-nav--inverted"]]: invert,
      })}
    >
      <nav>
        <ul className="list-unstyled">
          {items.map((itm, i) => (
            <li
              key={i}
              className={clsx({ [styles["active"]]: pathname === itm.path })}
            >
              <Link href={itm.path}>
                <a>{itm.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles["site-nav__logo"]}>
        <Link href={"/"}>
          <a>
            <Logo color={invert ? "#FFF" : "#000"} />
          </a>
        </Link>
      </div>
    </div>
  );
};
