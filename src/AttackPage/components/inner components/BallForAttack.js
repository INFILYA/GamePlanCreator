import { useState } from "react";

export function BallForAttack({
  className,
  index,
  zonesStates,
  setZonesStates,
  setShowInputs,
  value,
  setShowBalls,
}) {
  const [showTheBall, setShowTheBall] = useState(true);
  function onClickSetCorrectBall(index) {
    const newBalls = [...zonesStates];
    if (showTheBall) {
      newBalls[index] = { ...newBalls[index], active: true };
      setShowInputs(true);
      setShowBalls(true);
      setShowTheBall(!showTheBall);
    } else {
      newBalls[index] = { ...newBalls[index], active: false };
      setShowInputs(false);
      setShowBalls(false);
      setShowTheBall(!showTheBall);
    }
    setZonesStates(newBalls);
  }
  return (
    <>
      <button type="button" className={className} onClick={() => onClickSetCorrectBall(index)}>
        {value}
      </button>
    </>
  );
}
