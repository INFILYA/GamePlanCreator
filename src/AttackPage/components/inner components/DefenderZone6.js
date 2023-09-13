import { useState } from "react";

export function DefenderZone6() {
  const [blockHelp, setBlockHelp] = useState(0);
  const blockClassNames = ["defenderOff", "defenderOn", "smallarrowleft", "smallarrowright"];
  return (
    <button
      type="button"
      className={blockClassNames[blockHelp]}
      onClick={() => setBlockHelp((blockHelp + 1) % 4)}
    ></button>
  );
}
