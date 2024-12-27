"use client";

import SmartImage from "../SmartImage";
import styles from "./ModelGrid.module.scss";
import ModelGridItem from "./ModelGridItem";

/** A 3D model project */
type Model = {
  title: string;
  imageURL: string;
  fileURL?: string;
};

type Props = {
  title: string;
  items: Model[];
};

const ModelGrid: React.FC<Props> = ({ title, items }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 data-text={title}>{title}</h2>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <ModelGridItem key={`${item.title}-${item.imageURL}`} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ModelGrid;
