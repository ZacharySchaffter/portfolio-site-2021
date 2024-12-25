// a configuration object for an image at a specific breakpoint.
export type ImageBreakpoint = {
  breakpoint: number;
  width: number;
  height?: number;
  src?: string;
  crop?: boolean;
};

// Known + supported image formats
export type ImageFormat = "png" | "jpg" | "jpeg" | "webp";
