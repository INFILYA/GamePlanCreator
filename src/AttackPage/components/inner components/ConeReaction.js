import { useState } from "react";
import tinycolor from "tinycolor2";

export function ConeReaction({ value }) {
  const [active, setActive] = useState(false);
  const color = tinycolor({ h: 60 - ((value * 2) / 100) * 60, s: 100, l: 50 });
  const opacity = value === 0 ? 0 : 1;
  const backgroundColor = {
    background: color.toHexString(),
    opacity: opacity,
    color: "black",
    border: active ? "2px solid black" : "none",
    borderRadius: "50%",
  };
  return (
    <button
      style={backgroundColor}
      className="result"
      onClick={() => setActive(!active)}
      disabled={!opacity}
    >
      {active && `${value}%`}
    </button>
  );
}
