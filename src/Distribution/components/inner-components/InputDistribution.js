import tinycolor from "tinycolor2";

export function InputDistribution({ zoneValue, handleZoneValue, name, readOnly }) {
  const color = tinycolor({ h: 60 - ((zoneValue * 1.5) / 100) * 60, s: 100, l: 50 });
  const opacity = zoneValue === 0 ? 0 : 1;
  const backgroundColor = { background: color.toHexString(), opacity: opacity };
  return (
    <div className="input-wrapper">
      <input
        style={readOnly ? backgroundColor : null}
        type="text"
        name={name}
        value={readOnly ? `${zoneValue}%` : zoneValue}
        onChange={handleZoneValue}
        required
        readOnly={readOnly}
      ></input>
    </div>
  );
}
