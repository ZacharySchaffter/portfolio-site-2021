import Image from "next/image";

const socialMedia = [
  {
    name: "GitHub",
    icon: null,
    url: "github.com/zacharyschaffter",
    description: "Where I store my code",
  },
  {
    name: "CodePen",
    icon: null,
    url: "codepen.com/zacharyschaffter",
    description: "Where I tinker with code",
  },
  {
    name: "LinkedIn",
    icon: null,
    url: "linkedin.com/zacharyschaffter",
    description: "Where I 'network', or whatever",
  },
  {
    name: "Shapeways",
    icon: null,
    url: "shapeways.com/robozack",
    description: "Where I have fun",
  },
].filter((sm) => {
  sm.icon && sm.title && sm.url;
});

export default (props) => (
  <>
    {socialMedia.map((sm) => (
      <a href={sm.url} title={sm.description || sm.title}>
        <img src={sm.url} alt={sm.title} />
      </a>
    ))}
  </>
);
