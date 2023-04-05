export const Logo = ({ color = "#000" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    {/* Z */}

    <path
      stroke={color}
      strokeWidth={0.2}
      d="M2.84,6.91l10.92,5.18-.06,2.54L2.89,9.53,2.84,6.91m-.26-.4.06,3.18L13.94,15,14,11.94,2.58,6.51Z"
    />
    <path
      fill={color}
      d="M14,24.87l-12.2-6L14,12.05v3.58L8.4,18.58,14,21.21Z"
    />

    {/* Divider Line */}
    <rect fill={color} x="15.83" y="9.7" width="0.53" height="16.87" />

    {/* S */}

    <path
      stroke={color}
      strokeWidth={0.2}
      d="M29.16,6.91l-.05,2.62L18.3,14.63l-.06-2.54L29.16,6.91m.26-.4L18,11.94,18.06,15l11.3-5.33.06-3.18Z"
    />
    <path fill={color} d="M18,24.87V21.21l5.6-2.63L18,15.63V12.05l12.2,6.79Z" />
  </svg>
);

export const GitHub = ({ color = "#000" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g id="GitHub">
      <path
        fill={color}
        d="M50,1.28A50,50,0,0,0,34.17,98.64c2.49.46,3.41-1.09,3.41-2.41s0-4.33-.07-8.5C23.61,90.75,20.68,81,20.68,81c-2.27-5.78-5.55-7.31-5.55-7.31-4.53-3.1.35-3,.35-3,5,.35,7.65,5.15,7.65,5.15,4.45,7.63,11.69,5.43,14.54,4.15a10.64,10.64,0,0,1,3.17-6.68c-11.09-1.26-22.76-5.54-22.76-24.69a19.29,19.29,0,0,1,5.15-13.4C22.71,34,21,28.87,23.72,22c0,0,4.19-1.35,13.73,5.12a47.42,47.42,0,0,1,25,0C72,20.65,76.19,22,76.19,22c2.73,6.87,1,12,.5,13.22a19.27,19.27,0,0,1,5.13,13.4C81.82,67.81,70.14,72,59,73.27c1.8,1.55,3.39,4.59,3.39,9.25,0,6.68-.06,12.07-.06,13.71,0,1.34.9,2.89,3.44,2.4A50,50,0,0,0,50,1.28Z"
      />
    </g>
  </svg>
);

export const Shapeways = ({ color = "#000" }) => (
  <svg id="Shapeways" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path
      fill={color}
      d="M50,0A50,50,0,1,0,99.91,50,50,50,0,0,0,50,0ZM56.1,60.43a8.86,8.86,0,0,1-1.64,3.29,13.69,13.69,0,0,1-6.41,4.68,30.79,30.79,0,0,1-11,1.64,49.19,49.19,0,0,1-6.58-.43,27.91,27.91,0,0,1-5.29-1.21,13.69,13.69,0,0,1-6.92-4.76,13.31,13.31,0,0,1-2.69-7.36H28.74a6.19,6.19,0,0,0,1,2.16,4.85,4.85,0,0,0,1.56,1.13c1.91,1,6.06.78,6.15.78a16.85,16.85,0,0,0,5.19-.78,2.25,2.25,0,0,0,1.48-2.08,1.86,1.86,0,0,0-.87-1.65A9.92,9.92,0,0,0,39.83,55c-1.73-.17-4.25-.43-7.45-.61C27,54,22.94,53,20.35,51.26s-4-4.51-4-8.4a11.19,11.19,0,0,1,5-9.7c3.2-2.34,8-3.46,13.85-3.46,6.06,0,10.91,1,14.28,3A14,14,0,0,1,56.19,43H43.46a1.46,1.46,0,0,0-.08-.35A3.89,3.89,0,0,0,41,40a17.25,17.25,0,0,0-5.72-.87c-1.12,0-4,.09-5.19.78a2.33,2.33,0,0,0-1.3,2c0,1.22.87,1.56,1.73,1.82a22.22,22.22,0,0,0,3.21.61c1.38.17,3.29.35,5.54.52.6,0,3.55.26,5.37.52a39.9,39.9,0,0,1,4.32,1A11.19,11.19,0,0,1,54.81,50a10.62,10.62,0,0,1,1.9,6.4A18.27,18.27,0,0,1,56.1,60.43Zm23.47,8.49H74.89L71.6,46.75s-.17-4.41-.17-6.06h-.09l-.17,6.06L67.88,68.92H63.2L59,30.82h5.28L66,53.16l.09,6.23h.09l.17-6.32,3-22.25h4l3,22.25.18,6.32h.08l.09-6.23,1.73-22.34h5.28Z"
    />
  </svg>
);

export const CodePen = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g id="CodePen">
      <g>
        <polygon
          fill={color}
          points="24.46 45.56 24.46 54.44 31.1 50 24.46 45.56"
        />
        <polygon
          fill={color}
          points="47.36 39.13 47.36 26.76 26.59 40.61 35.86 46.81 47.36 39.13"
        />
        <polygon
          fill={color}
          points="73.43 40.61 52.66 26.76 52.66 39.13 64.15 46.81 73.43 40.61"
        />
        <polygon
          fill={color}
          points="26.59 59.4 47.36 73.24 47.36 60.88 35.86 53.19 26.59 59.4"
        />
        <polygon
          fill={color}
          points="52.66 60.88 52.66 73.24 73.43 59.4 64.15 53.19 52.66 60.88"
        />
        <polygon
          fill={color}
          points="50.01 43.73 40.63 50 50.01 56.27 59.38 50 50.01 43.73"
        />
        <path
          fill={color}
          d="M50,.12A49.88,49.88,0,1,0,99.89,50,49.89,49.89,0,0,0,50,.12ZM80.85,59.4c0,.11,0,.23,0,.35l0,.11a1.7,1.7,0,0,1,0,.22l0,.13-.07.19-.06.13-.09.18a.83.83,0,0,1-.08.12.91.91,0,0,1-.11.16l-.09.12-.13.14-.11.1a.93.93,0,0,1-.15.13l-.12.09,0,0L51.48,80.4a2.72,2.72,0,0,1-1.47.44,2.67,2.67,0,0,1-1.47-.44L20.34,61.6l0,0-.12-.09L20,61.35l-.11-.1a.86.86,0,0,0-.13-.14L19.7,61a.91.91,0,0,1-.11-.16l-.08-.12-.09-.18-.06-.13-.06-.19s0-.09-.05-.13,0-.15,0-.22a.52.52,0,0,1,0-.11,2.16,2.16,0,0,1,0-.35V40.6a2,2,0,0,1,0-.34.5.5,0,0,1,0-.12c0-.07,0-.15,0-.22s0-.09.05-.13l.06-.19.06-.13.09-.18.08-.12L19.7,39l.09-.12a.86.86,0,0,0,.13-.14l.11-.1.15-.13.12-.09,0,0,28.2-18.8a2.66,2.66,0,0,1,2.94,0L79.67,38.4l0,0,.12.09a.93.93,0,0,1,.15.13l.11.1.13.14.09.12.11.16a.83.83,0,0,1,.08.12l.09.18.06.13.07.19,0,.13a1.7,1.7,0,0,1,0,.22l0,.12c0,.11,0,.23,0,.34Z"
        />
        <polygon
          fill={color}
          points="75.55 54.44 75.55 45.56 68.92 50 75.55 54.44"
        />
      </g>
    </g>
  </svg>
);

export const LinkedIn = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <g id="Linkedin">
      <path
        fill={color}
        d="M92.5.1h-85A7.32,7.32,0,0,0,.12,7.29V92.65a7.32,7.32,0,0,0,7.37,7.2h85a7.33,7.33,0,0,0,7.39-7.2V7.28A7.33,7.33,0,0,0,92.5.09m-7.37,85H70.35V62c0-5.52-.1-12.63-7.69-12.63s-8.88,6-8.88,12.22V85.09H39V37.49H53.19V44h.2a15.55,15.55,0,0,1,14-7.68c15,0,17.75,9.85,17.75,22.67ZM22.32,31h0A8.58,8.58,0,1,1,30.9,22.4h0A8.62,8.62,0,0,1,22.32,31M29.71,85.1H14.91V37.49h14.8Z"
      />
    </g>
  </svg>
);

export default {
  Logo,
  CodePen,
  GitHub,
  LinkedIn,
  Shapeways,
};
