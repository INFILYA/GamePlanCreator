export function ConeReaction({ zoneValue, cone, zonesStates, type }) {
  function button(zone) {
    const x = zoneValue === 0 ? "transparent" : 100 - zoneValue * 1.5;
    return (
      <button
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
  return (
    <>
      {type === "Attack"
        ? (zonesStates[0].active && button("zone1")) ||
          (zonesStates[1].active && button("zone2")) ||
          (zonesStates[2].active && button("zone4")) ||
          (zonesStates[3].active && button("Pipe")) ||
          (zonesStates[4].active && button("K1")) ||
          (zonesStates[5].active && button("KC")) ||
          (zonesStates[6].active && button("K7"))
        : (zonesStates[0].active && button("service1")) ||
          (zonesStates[1].active && button("service6")) ||
          (zonesStates[2].active && button("service5"))}
    </>
  );
}
