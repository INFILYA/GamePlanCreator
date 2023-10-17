export function ConeReaction({ zoneValue, cone, zonesStates, type }) {
  function button(zone) {
    const x = zoneValue === 0 ? "transparent" : 100 - zoneValue * 1.5;
    return (
      <button
        key={zone}
        type="button"
        style={
          zoneValue > 40
            ? { backgroundColor: `hsl(0,100%,${x}%)`, color: "white" }
            : { backgroundColor: `hsl(0,100%,${x}%)` }
        }
        className={zone + cone}
      >
        {zoneValue}%
      </button>
    );
  }
  const Zones =
    type === "Attack"
      ? ["zone1", "zone2", "zone4", "Pipe", "K1", "KC", "K7"]
      : ["service1", "service6", "service5"];
  const newArray = zonesStates.map((zone, index) => zone.active && button(Zones[index]));

  return <>{newArray}</>;
}
