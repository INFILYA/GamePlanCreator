export function InputDistribution({ zoneValue, handleZoneValue, name, readOnly }) {
  const x = zoneValue === 0 ? 0 : zoneValue * 2;
  return (
    <div className="input-wrapper">
      <input
        style={
          readOnly
            ? {
                backgroundColor:
                  zoneValue !== 0
                    ? `hsl(${
                        zoneValue <= 15
                          ? 200
                          : zoneValue > 15 && zoneValue < 30
                          ? 100
                          : zoneValue >= 30 && zoneValue < 45
                          ? 50
                          : 0
                      },${x}%,50%)`
                    : "transparent",
                color: zoneValue === 0 && "transparent",
              }
            : null
        }
        type="text"
        name={name}
        value={zoneValue}
        onChange={handleZoneValue}
        required
        readOnly={readOnly}
      ></input>
    </div>
  );
}
