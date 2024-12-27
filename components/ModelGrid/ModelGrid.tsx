import clsx from "clsx";
import SmartImage from "../SmartImage";
import styles from "./ModelGrid.module.scss";

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
          <SmartImage
            key={item.imageURL}
            className={styles.gridItem}
            width={400}
            src={item.imageURL}
            alt={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelGrid;
