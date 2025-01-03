import SocialMediaLinks from "@/components/SocialMediaLinks";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <SocialMediaLinks className={styles["footer__social"]} color="#FFF" />
      <div className={styles["footer__copyright"]}>
        &copy; Zachary Schaffter {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
