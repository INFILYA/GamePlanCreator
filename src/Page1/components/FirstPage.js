import { useDispatch, useSelector } from "react-redux";
import { PersonalInformationOfPlayer } from "../../PersonalInfo/PersonalInformationOfPlayer";
import { ChooseOpponentTeam } from "./ChooseOpponentTeam";
import { IconOfPlayer } from "./IconOfPlayer";
import { Squads } from "./Squads";
import {
  clearMyTeamZones,
  rotateBackMyTeam,
  rotateForwardMyTeam,
} from "../../states/reducers/myTeamZonesReducer";
import { setMyTeamPlayers } from "../../states/reducers/myTeamPlayersReducer";
import { setMyTeam, setResetMyTeam } from "../../states/reducers/myClubReducer";
import { correctNamesOfZones } from "../../Datas/api";
import { Button } from "../../StaticHelpModules/Button";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, dataBase } from "../../config/firebase";
import { setAllTeams } from "../../states/reducers/listOfTeamsReducer";
import { setRivalPlayers } from "../../states/reducers/rivalPlayersReducer";
import { setResetRivalTeam } from "../../states/reducers/rivalClubReducer";
import { clearRivalZones } from "../../states/reducers/zonesReducer";
import { setBackRightRivalSelects } from "../../states/reducers/indexOfZonesReducer";
import { setBackRightMyTeamSelects } from "../../states/reducers/sequanceOfZonesReducer";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";
import { useAuthState } from "react-firebase-hooks/auth";

export function FirstPage() {
  const dispatch = useDispatch();
  const [isRegistratedUser] = useAuthState(auth);
  const listOfTeams = useSelector((state) => state.listOfTeams);
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  const rivalClub = useSelector((state) => state.rivalClub);
  const playerInfo = useSelector((state) => state.playerInfo);
  const zones = useSelector((state) => state.zones);
  const myTeamZones = useSelector((state) => state.myTeamZones);
  const myClub = useSelector((state) => state.myClub);
  const clubsCollectionRefs = collection(dataBase, "clubs");
  const admin = isRegistratedUser?.uid === "7bSxPLITtrPknGnwKfzazxwjOd82";

  function resetTheBoardForRivalTeam() {
    dispatch(setRivalPlayers([]));
    dispatch(setResetRivalTeam([]));
    dispatch(clearRivalZones(Array(6).fill(null)));
    dispatch(setBackRightRivalSelects([5, 2, 1, 0, 3, 4]));
    dispatch(setInfoOfPlayer(null));
  }
  function resetTheBoardForMyClub() {
    dispatch(setMyTeamPlayers([]));
    dispatch(setResetMyTeam([]));
    dispatch(clearMyTeamZones(Array(6).fill(null)));
    dispatch(setBackRightMyTeamSelects([5, 2, 1, 0, 3, 4]));
    dispatch(setInfoOfPlayer(null));
  }

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {rivalClub.length !== 0 ? (
              <button
                onClick={resetTheBoardForRivalTeam}
                className="reset"
                style={{ marginTop: -20 }}
              >
                Reset
              </button>
            ) : (
              <div></div>
            )}
            {myClub.length !== 0 && (
              <button onClick={resetTheBoardForMyClub} className="reset" style={{ marginTop: -20 }}>
                Reset
              </button>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {playerInfo && <PersonalInformationOfPlayer link={"page1"} />}
          </div>
          {rivalClub.length < 1 && myClub.length < 1 ? (
            <ChooseOpponentTeam />
          ) : (
            <div>
              <div style={{ marginBottom: 8 }}>
                {zones.slice(0, 3).map((player, index) =>
                  player ? (
                    <div className="container" key={player.name}>
                      <IconOfPlayer player={player} zones={zones} type={"rival"} />
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
                    <div className="smallBox" key={player.name}>
                      <IconOfPlayer player={player} zones={myTeamZones} type={"my"} />
                    </div>
                  ) : (
                    <div className="smallBox" key={"x" + index}></div>
                  )
                )}
              </div>
              <div style={{ marginBottom: 9 }}>
                {zones.slice(3, 6).map((player, index) =>
                  player ? (
                    <div className="container" key={player.name}>
                      <IconOfPlayer player={player} zones={zones} type={"rival"} />
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
                    <div className="smallBox" key={player.name}>
                      <IconOfPlayer player={player} zones={myTeamZones} type={"my"} />
                    </div>
                  ) : (
                    <div className="smallBox" key={"x" + index}></div>
                  )
                )}
              </div>
            </div>
          )}

          {!zones.includes(null) && admin && (
            <div style={{ marginTop: -30 }}>
              <Button onClick={saveStartingSix} value={"Save starting six"} />
            </div>
          )}
          {myTeamZones.every((zone) => zone !== null) && isRegistratedUser && (
            <div className="plusMinus">
              <button onClick={moveRotationForward}>-</button>
              {myTeamZones.map((player, index) =>
                player && player.position === "Setter" ? (
                  <span key={player.name} style={{ marginLeft: 50, marginRight: 50, fontSize: 35 }}>
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
            {rivalClub.length !== 0 && (
              <select className="chooseHomeTeam" onChange={handleSetMyTeam}>
                <option value="Choose home team">Choose team</option>
                {listOfTeams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>
    </>
  );
}
