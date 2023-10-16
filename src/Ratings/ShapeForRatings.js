import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compare } from "../Datas/api";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { setInfoOfPlayer } from "../states/slices/playerInfoSlice";
import { upgradeAge } from "../StaticHelpModules/Button";

export default function ShapeForRatings({ amplua }) {
  const dispatch = useDispatch();
  const Players = useSelector((state) => state.listOfPlayers.listOfPlayers);
  const listOfTeams = useSelector((state) => state.listOfTeams.listOfTeams);
  const listOfPlayers = Players.map((player) => upgradeAge(player));
  const playerInfo = useSelector((state) => state.playerInfo.playerInfo);
  const [directionOfSort, setDirectionOfSort] = useState(false);
  const [teamsOrPlayers, setTeamsOrPlayers] = useState(
    amplua === "teams" ? listOfTeams : listOfPlayers.filter((player) => player.position === amplua)
  );
  const categorysForAll = [
    { category: "name", text: "Name" },
    { category: "age", text: "Age" },
    { category: "height", text: "Height" },
    { category: "winPoints", text: " Points by Attack" },
    { category: "plusMinusOnAttack", text: "+/-  Attack" },
    { category: "plusMinusOnService", text: "+/-  Service" },
    { category: "percentOfAttack", text: "%  Attack" },
  ];
  const categorysForOthers = [
    { category: "name", text: "Name" },
    { category: "age", text: "Age" },
    { category: "height", text: "Height" },
    { category: "aces", text: "Aces" },
    { category: "serviceFailed", text: "Service Failed" },
    { category: "plusMinusOnService", text: "+/-  Service" },
    { category: "height", text: "Height" },
  ];
  const categorys = amplua === "Setter" ? categorysForOthers : categorysForAll;

  function countRankings(category) {
    const newArr2 = [...teamsOrPlayers];
    !directionOfSort
      ? newArr2.sort((a, b) => compare(b[category], a[category]))
      : newArr2.sort((a, b) => compare(a[category], b[category]));
    setTeamsOrPlayers(newArr2);
    setDirectionOfSort(!directionOfSort);
  }
  function changePodiumColors(index) {
    const backgrounds = [
      { backgroundColor: "gold" },
      { backgroundColor: "silver" },
      { backgroundColor: "burlywood" },
    ];
    return backgrounds[index];
  }
  function showInfoOfPlayer(name) {
    const pickedPlayer = Players.find((player) => player.name === name);
    dispatch(setInfoOfPlayer(pickedPlayer));
  }
  return (
    <>
      {playerInfo && (
        <div className="showInfo-wrapper">
          <div>
            <PersonalInformationOfPlayer link="page1" />
          </div>
        </div>
      )}
      <div className="rows-wrapper">
        {categorys.map((category, index) => (
          <div className="rating-row" key={index}>
            <div className="rating-button-wrapper">
              <button
                onClick={() => countRankings(category.category)}
                title={`Click to sort by ${category.text}`}
              >
                {category.text}
              </button>
            </div>
            <div className="players-row-wrapper">
              {teamsOrPlayers.map((player, index) =>
                category.text !== "Name" ? (
                  <div className="span-wrapper" style={changePodiumColors(index)} key={index}>
                    <span>
                      {category.category === "percentOfAttack" && amplua !== "Setter"
                        ? player[category.category] + "%"
                        : player[category.category]}
                    </span>
                  </div>
                ) : (
                  <div className="name-span-wrapper" style={changePodiumColors(index)} key={index}>
                    {"position" in player && (
                      <span
                        onClick={
                          teamsOrPlayers !== listOfTeams
                            ? () => showInfoOfPlayer(player.name)
                            : null
                        }
                      >
                        {index + 1}. {player[category.category]}
                      </span>
                    )}
                    <div
                      className="rating-image-wrapper"
                      style={!("position" in player) ? { width: "100%" } : {}}
                    >
                      <img alt="" src={`/photos/${player.teamid || player.id}.jpg`}></img>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
