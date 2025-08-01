import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function TrashIcon(props: SvgProps) {
  return (
    <Svg width={14.6} height={18.46} viewBox="0 0 19 24" fill="none" {...props}>
      <Path
        d="M1.80087 20.75C1.80087 22.125 2.971 23.25 4.40115 23.25H14.8023C16.2324 23.25 17.4025 22.125 17.4025 20.75V5.75H1.80087V20.75ZM4.99921 11.85L6.83241 10.0875L9.6017 12.7375L12.358 10.0875L14.1912 11.85L11.4349 14.5L14.1912 17.15L12.358 18.9125L9.6017 16.2625L6.84541 18.9125L5.01221 17.15L7.76851 14.5L4.99921 11.85ZM14.1522 2L12.852 0.75H6.35136L5.05122 2H0.500732V4.5H18.7027V2H14.1522Z"
        fill="white"
      />
    </Svg>
  );
}
