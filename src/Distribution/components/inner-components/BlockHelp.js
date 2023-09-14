import { useState } from "react";

export function BlockHelp() {
  const [blockHelp, setBlockHelp] = useState(0);
  const classNames = ["blockOff", "blockOn", "smallarrowleft", "smallarrowright"];
  return (
    <button
      type="button"
      className={classNames[blockHelp]}
      onClick={() => setBlockHelp((blockHelp + 1) % 4)}
    ></button>
  );
}
