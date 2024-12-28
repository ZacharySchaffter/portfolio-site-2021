"use client";

import { useState } from "react";
import SmartImage from "../SmartImage";
import styles from "./ModelGrid.module.scss";
import Modal from "../Modal";

type Props = {
  title: string;
  imageURL: string;
};

const ModelGridItem: React.FC<Props> = ({ title, imageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className={styles.gridItem}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <SmartImage
          width={400}
          src={imageURL}
          alt={title}
          className={styles.gridItemImage}
        />
        {title && <div className={styles.gridItemTitle}>{title}</div>}
      </div>

      <Modal isOpen={isModalOpen} onClose={setIsModalOpen}>
        <SmartImage
          width={800}
          src={imageURL}
          alt={title}
          className={styles.modalImage}
        />
      </Modal>
    </>
  );
};

export default ModelGridItem;
