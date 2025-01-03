import clsx from "clsx";
import * as Icons from "@/icons";

const socialMedia = [
  {
    name: "CodePen",
    icon: Icons.CodePen,
    url: "https://codepen.com/zschaffter",
    description: "Some fun CSS experiments",
  },
  {
    name: "GitHub",
    icon: Icons.GitHub,
    url: "https://github.com/zacharyschaffter",
    description: "",
  },
  // Shapeways went bankrupt, so is no longer a valid platform
  // {
  //   name: "Shapeways",
  //   icon: Icons.Shapeways,
  //   url: "https://www.shapeways.com/shops/robozack",
  //   description: "Some of my 3D Prints",
  // },
  {
    name: "LinkedIn",
    icon: Icons.LinkedIn,
    url: "https://www.linkedin.com/in/zachary-schaffter/",
    description: "Let's connect, just don't expect me to post",
  },
];

type Props = {
  color?: string;
  className?: string;
};

const SocialMediaLinks: React.FC<Props> = ({ color, className }) => (
  <div className={clsx("social-media", className)}>
    {socialMedia.map((sm) => (
      <a
        key={sm.name}
        href={sm.url}
        title={`${sm.name}${sm.description ? ` - ${sm.description}` : ""}`}
      >
        <sm.icon color={color} />
      </a>
    ))}
  </div>
);

export default SocialMediaLinks;
