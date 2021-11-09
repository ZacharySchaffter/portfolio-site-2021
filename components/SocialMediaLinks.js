import clsx from "clsx";
import Icons from "./icons";

const socialMedia = [
  {
    name: "CodePen",
    icon: Icons.CodePen,
    url: "codepen.com/zacharyschaffter",
    description: "My code scratch pad.",
  },
  {
    name: "GitHub",
    icon: Icons.GitHub,
    url: "github.com/zacharyschaffter",
    description: "Go ahead and creep on my code",
  },
  {
    name: "Shapeways",
    icon: Icons.Shapeways,
    url: "shapeways.com/robozack",
    description: "Some of my 3D Prints",
  },
  {
    name: "LinkedIn",
    icon: Icons.LinkedIn,
    url: "linkedin.com/zacharyschaffter",
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
