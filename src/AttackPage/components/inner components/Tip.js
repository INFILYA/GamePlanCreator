import { useState } from "react";

export default function Tip({ value }) {
  const [tip, setTip] = useState(0);
  const TipclassNames = ["tip", "yellowtip"];
  return (
    <input
      type="button"
      className={TipclassNames[tip]}
      value={value}
      onClick={() => setTip((tip + 1) % 2)}
    ></input>
  );
}
