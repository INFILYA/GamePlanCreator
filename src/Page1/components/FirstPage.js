import { useDispatch, useSelector } from "react-redux";
import { PersonalInformationOfPlayer } from "../../PersonalInfo/PersonalInformationOfPlayer";
import { ChooseOpponentTeam } from "./ChooseOpponentTeam";
import { IconOfPlayer } from "./IconOfPlayer";
import { Squads } from "./Squads";
import { rotateBackMyTeam, rotateForwardMyTeam } from "../../states/reducers/myTeamZonesReducer";
import { setMyTeamPlayers } from "../../states/reducers/myTeamPlayersReducer";
import { setMyTeam } from "../../states/reducers/myClubReducer";
import { correctNamesOfZones } from "../../Datas/api";
import { Button } from "../../StaticHelpModules/Button";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, dataBase } from "../../config/firebase";
import { setAllTeams } from "../../states/reducers/listOfTeamsReducer";

export function FirstPage() {
  const dispatch = useDispatch();
  const listOfTeams = useSelector((state) => state.listOfTeams);
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  const rivalClub = useSelector((state) => state.rivalClub);
  const playerInfo = useSelector((state) => state.playerInfo);
  const zones = useSelector((state) => state.zones);
  const myTeamZones = useSelector((state) => state.myTeamZones);
  const myClub = useSelector((state) => state.myClub);
  const isRegistratedUser = useSelector((state) => state.isRegistratedUser);
  const clubsCollectionRefs = collection(dataBase, "clubs");
  const admin = auth?.currentUser?.uid === "D7yAMMxiXnMbYP7OjrnEPCqV64H2";

  function handleSetMyTeam(event) {
    dispatch(setMyTeamPlayers(listOfPlayers, event.target.value));
    dispatch(setMyTeam(listOfTeams, event.target.value));
  }
  function moveRotationForward() {
    dispatch(rotateForwardMyTeam());
  }
  function moveRotationBack() {
    dispatch(rotateBackMyTeam());
  }
  function saveStartingSix() {
    saveTeam({
      ...rivalClub,
      startingSquad: zones.map((zone) => zone.id),
    });
  }
  const saveTeam = async (team) => {
    try {
      const docRef = doc(dataBase, "clubs", team.id);
      await setDoc(docRef, team);
      const data = await getDocs(clubsCollectionRefs);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setAllTeams(list));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Squads />
        <div className="rotation">
          <div style={{ display: "flex", justifyContent: "center" }}>
            {playerInfo && <PersonalInformationOfPlayer link={"page1"} />}
          </div>
          <ChooseOpponentTeam />
          <div style={{ marginBottom: 8 }}>
            {zones.slice(0, 3).map((player, index) =>
              player ? (
                <div className="container" key={player.id}>
                  <IconOfPlayer player={player} zones={zones} />
                </div>
              ) : (
                <div className="container" key={"_" + index}>
                  {correctNamesOfZones(index)}
                </div>
              )
            )}
          </div>
          <div>
            {myTeamZones.slice(0, 3).map((player, index) =>
              player ? (
                <div className="smallBox" key={player.id}>
                  <IconOfPlayer player={player} />
                </div>
              ) : (
                <div className="smallBox" key={"x" + index}></div>
              )
            )}
          </div>
          <div style={{ marginBottom: 9 }}>
            {zones.slice(3, 6).map((player, index) =>
              player ? (
                <div className="container" key={player.id}>
                  <IconOfPlayer player={player} zones={zones} />
                </div>
              ) : (
                <div className="container" key={"_" + index}>
                  {correctNamesOfZones(index + 3)}
                </div>
              )
            )}
          </div>
          <div>
            {myTeamZones.slice(3, 6).map((player, index) =>
              player ? (
                <div className="smallBox" key={player.id}>
                  <IconOfPlayer player={player} />
                </div>
              ) : (
                <div className="smallBox" key={"x" + index}></div>
              )
            )}
          </div>
          {!zones.includes(null) && admin && (
            <div style={{ marginTop: -30 }}>
              <Button onClick={saveStartingSix} value={"Save starting six"} />
            </div>
          )}
          {myTeamZones.some((zone) => zone?.position === "Setter") && isRegistratedUser && (
            <div className="plusMinus">
              <button onClick={moveRotationForward}>-</button>
              {myTeamZones.map((player, index) =>
                player && player.position === "Setter" ? (
                  <span key={player.id} style={{ marginLeft: 50, marginRight: 50, fontSize: 35 }}>
                    {correctNamesOfZones(index)}
                  </span>
                ) : null
              )}
              <button onClick={moveRotationBack}>+</button>
            </div>
          )}
        </div>
        {myClub?.id ? (
          <Squads team={"my"} />
        ) : (
          <div className="teamsquad">
            <select className="chooseHomeTeam" onChange={handleSetMyTeam}>
              <option value="Choose home team">Choose team</option>
              {listOfTeams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
}
