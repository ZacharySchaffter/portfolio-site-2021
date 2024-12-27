"use client";

import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import styles from "./Modal.module.scss";

type Props = {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  showCloseButton?: boolean;
  title?: string;
};

const Modal: React.FC<PropsWithChildren<Props>> = ({
  title,
  showCloseButton = true,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className={styles.wrapper}>
      <DialogBackdrop transition className={styles.backdrop} />

      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <DialogPanel transition className={styles.modal}>
            {showCloseButton && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => {
                  onClose(false);
                }}
              >
                <span className="sr-only">Close modal</span> &#x2715;
              </button>
            )}
            <div
              style={{
                backgroundColor: "#FFF",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <div>
                  {title && <DialogTitle as="h3">{title}</DialogTitle>}
                  {children}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
