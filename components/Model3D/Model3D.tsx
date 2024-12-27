import SmartImage from "@/components/SmartImage";
import styles from "./Project3D.module.scss";

export type Props = {
  title: string;
  imageURL: string;
  /** url to a 3D file for this model, to be rendered in three.js  */
  fileURL?: string;
};
const Project3D: React.FC<Props> = ({ title, imageURL, fileURL }) => {
  return <SmartImage src={imageURL} alt={title} width={400} />;
};

export default Project3D;
