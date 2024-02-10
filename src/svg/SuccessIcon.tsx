import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SuccessIcon = (props: SvgProps) => (
  <Svg
    width={134}
    height={123}
    fill="none"
    {...props}
  >
    <Path
      fill="#A9A9A9"
      d="M98.452 18.216c1.748-2.075 1.492-5.191-.715-6.767a61.5 61.5 0 1 0 25.32 57.421c.325-2.693-1.804-4.983-4.514-5.092-2.711-.11-4.972 2.005-5.338 4.693a51.676 51.676 0 1 1-21.818-49.479c2.231 1.543 5.318 1.299 7.065-.776Z"
    />
    <Path
      stroke="#A9A9A9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={20}
      d="M123.5 19.196 63.377 79.63 36.05 52.16"
    />
  </Svg>
)
export default SuccessIcon;
