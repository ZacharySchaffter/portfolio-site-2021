import clsx from "clsx";
import optimizeSource from "@/utils/image/optimizeSource";
import getResponsiveSources from "@/utils/image/getResponsiveSources";

type ImageBreakpoint = {
  breakpoint: number;
  width: number;
};

// Default breakpoints for the responsive source map.
// The image will be `width`px wide when the viewport is at or under the specified breakpoint.
const defaultBreakpoints: ImageBreakpoint[] = [
  {
    breakpoint: 0,
    width: 576,
  },
  {
    breakpoint: 768,
    width: 992,
  },
  {
    breakpoint: 992,
    width: 1200,
  },
  {
    breakpoint: 1200,
    width: 1480,
  },
  {
    breakpoint: 1480,
    width: 1800,
  },
  {
    breakpoint: 1800,
    width: 2100,
  },
];

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: "responsive" | "static";
  breakpoints?: ImageBreakpoint[];
  className?: string;
};
const SmartImage: React.FC<Props> = ({
  src = "",
  alt = "",
  width,
  height,
  layout = "responsive", // 'responsive', 'static'
  breakpoints = defaultBreakpoints,
  className,
}) => {
  // Get responsive <sources> array
  const responsiveSources = getResponsiveSources(src, breakpoints);

  return (
    <div className={clsx("smart-image", className)}>
      <picture>
        {layout === "responsive" && responsiveSources ? (
          <>
            {/* RESPONSIVE PICTURE ELEMENT */}
            {responsiveSources.map((source, i) => (
              <source key={i} {...source} />
            ))}
          </>
        ) : (
          <>
            {/* 'STATIC' PICTURE ELEMENT */}
            <source
              srcSet={optimizeSource({
                url: src,
                width,
                height,
                format: "webp",
              })}
              type="image/webp"
            />
            <source
              srcSet={optimizeSource({
                url: src,
                width,
                height,
                format: "jpg",
              })}
              type="image/jpeg"
            />
          </>
        )}
        <img
          src={optimizeSource({ url: src, width, height, format: "jpg" })}
          alt={alt}
        />
      </picture>
    </div>
  );
};

export default SmartImage;
