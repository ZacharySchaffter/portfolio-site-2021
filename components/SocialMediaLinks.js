import clsx from "clsx";
import * as Icons from "components/Icons";

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
    description: "Go ahead, creep on my code",
  },
  {
    name: "Shapeways",
    icon: Icons.Shapeways,
    url: "https://www.shapeways.com/shops/robozack",
    description: "Some of my 3D Prints",
  },
  {
    name: "LinkedIn",
    icon: Icons.LinkedIn,
    url: "https://www.linkedin.com/in/zachary-schaffter/",
    description: "Let's connect!",
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
