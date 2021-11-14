import clsx from "clsx";
import Icons from "./icons";

const socialMedia = [
  {
    name: "CodePen",
    icon: Icons.CodePen,
    url: "https://codepen.com/zschaffter",
    description: "My code scratch pad.",
  },
  {
    name: "GitHub",
    icon: Icons.GitHub,
    url: "https://github.com/zacharyschaffter",
    description: "Go ahead and creep on my code",
  },
  {
    name: "Shapeways",
    icon: Icons.Shapeways,
    url: "https://shapeways.com/robozack",
    description: "Some of my 3D Prints",
  },
  {
    name: "LinkedIn",
    icon: Icons.LinkedIn,
    url: "https://linkedin.com/zacharyschaffter",
    description: "Where I 'network', or whatever",
  },
];

export default ({ color, className }) => (
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
