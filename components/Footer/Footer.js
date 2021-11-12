import SocialMediaLinks from "/components/SocialMediaLinks";
import styles from "./Footer.module.scss";

export default () => {
  return (
    <footer className={styles["footer"]}>
      <SocialMediaLinks className={styles["footer__social"]} color={"#FFF"} />
    </footer>
  );
};
