import { useState } from "react";

export function Recievers() {
    const [blockHelp, setBlockHelp] = useState(0);
    const classNames = [
      "defenderOff",
      "defenderOn",
      "smallarrowleft",
      "smallarrowright",
    ];
    return (
      <>
        <button
          type="button"
          className={classNames[blockHelp]}
          onClick={() => setBlockHelp((blockHelp + 1) % 4)}
        ></button>
      </>
    );
  }