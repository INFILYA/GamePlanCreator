import { useDispatch, useSelector } from "react-redux";
import { PersonalInformationOfPlayer } from "../../PersonalInfo/PersonalInformationOfPlayer";
import { ChooseOpponentTeam } from "./ChooseOpponentTeam";
import { IconOfPlayer } from "./IconOfPlayer";
import { Squads } from "./Squads";
import {
  clearMyTeamZones,
  rotateBackMyTeam,
  rotateForwardMyTeam,
} from "../../states/slices/myTeamZonesSlice";
import { setMyTeamPlayers } from "../../states/slices/myTeamPlayersSlice";
import { resetMyTeamPlayers } from "../../states/slices/myTeamPlayersSlice";
import { setMyTeam, resetMyTeam } from "../../states/slices/myClubSlice";
import { correctNamesOfZones } from "../../Datas/api";
import { Button } from "../../StaticHelpModules/Button";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, dataBase } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { resetRivalPlayers } from "../../states/slices/rivalPlayersSlice";
import { resetRivalTeam } from "../../states/slices/rivalClubSlice";
import { clearRivalZones } from "../../states/slices/zonesSlice";
import { setBackRightRivalSelects } from "../../states/slices/indexOfZonesSlice";
import { setInfoOfPlayer } from "../../states/slices/playerInfoSlice";
import { setBackRightMyTeamSelects } from "../../states/slices/sequanceOfZonesSlice";
import { setAllTeams } from "../../states/slices/listOfTeamsSlice";
import { setUserVersion } from "../../states/slices/userVersionSlice";
import { NavLink } from "react-router-dom";

export function FirstPage() {
  const dispatch = useDispatch();
  const [isRegistratedUser] = useAuthState(auth);
  const listOfTeams = useSelector((state) => state.listOfTeams.listOfTeams);
  const listOfPlayers = useSelector((state) => state.listOfPlayers.listOfPlayers);
  const rivalClub = useSelector((state) => state.rivalClub.rivalClub);
  const playerInfo = useSelector((state) => state.playerInfo.playerInfo);
  const zones = useSelector((state) => state.zones.zones);
  const myTeamZones = useSelector((state) => state.myTeamZones.myTeamZones);
  const userVersion = useSelector((state) => state.userVersion.userVersion);
  const myClub = useSelector((state) => state.myClub.myClub);
  const showRivalClub = rivalClub.length !== 0;
  const showMyClub = myClub.length !== 0;
  const clubsCollectionRefs = collection(dataBase, "clubs");
  const admin = isRegistratedUser?.uid === "ld4Bdj6KepVG68kjNHHQRjacJI13";

  function resetTheBoardForRivalTeam() {
    dispatch(resetRivalPlayers([]));
    dispatch(resetRivalTeam([]));
    dispatch(clearRivalZones(Array(6).fill(null)));
    dispatch(setBackRightRivalSelects([5, 2, 1, 0, 3, 4]));
    dispatch(setInfoOfPlayer(null));
    resetTheBoardForMyClub();
  }
  function resetTheBoardForMyClub() {
    dispatch(resetMyTeamPlayers([]));
    dispatch(resetMyTeam([]));
    dispatch(clearMyTeamZones(Array(6).fill(null)));
    dispatch(setBackRightMyTeamSelects([5, 2, 1, 0, 3, 4]));
    dispatch(setInfoOfPlayer(null));
  }

  function handleSetMyTeam(event) {
    const value = event.target.value;
    dispatch(setMyTeamPlayers({ listOfPlayers, value }));
    dispatch(setMyTeam({ listOfTeams, value }));
  }
  async function saveStartingSix() {
    saveTeam({
      ...rivalClub,
      startingSquad: zones.map((zone) => zone.id),
    });
    try {
      const docVersionRef = doc(dataBase, "versionChecker", "currentVersion");
      await setDoc(docVersionRef, { currentVersion: userVersion + 1 });
      const adminVersion = userVersion + 1;
      dispatch(setUserVersion(adminVersion));
    } catch (error) {
      console.error(error);
    }
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
    <article className="main-content-wrapper">
      {showRivalClub && <Squads team={"rival"} />}
      <section className="playground-section">
        <div className="section-border">
          <div className="section-background">
            {!playerInfo && <img src="/photos/playarea.jpg" alt="" />}
          </div>
        </div>
        <div className="section-content-wrapper">
          <div className="section-content">
            {!showRivalClub && <ChooseOpponentTeam />}
            {playerInfo && <PersonalInformationOfPlayer link={"page1"} />}
            {!playerInfo && showRivalClub && (
              <div className="rotation-field-wrapper">
                <div className="reset-button-wrapper" style={{ justifyContent: "space-between" }}>
                  {showRivalClub ? (
                    <button onClick={resetTheBoardForRivalTeam} className="reset">
                      Reset
                    </button>
                  ) : (
                    <div></div>
                  )}
                  {showMyClub && (
                    <button onClick={resetTheBoardForMyClub} className="reset">
                      Reset
                    </button>
                  )}
                </div>
                <div className="row-zones-wrapper">
                  {zones.slice(0, 3).map((player, index) =>
                    player ? (
                      <IconOfPlayer
                        player={player}
                        zones={zones}
                        type={"rival"}
                        key={player.name}
                      />
                    ) : (
                      <div className="player-field-wrapper zone-names-wrapper" key={"_" + index}>
                        <div>{correctNamesOfZones(index)}</div>
                      </div>
                    )
                  )}
                </div>
                <div className="row-zones-wrapper">
                  {myTeamZones
                    .slice(0, 3)
                    .map((player, index) =>
                      player ? (
                        <IconOfPlayer
                          player={player}
                          zones={myTeamZones}
                          type={"my"}
                          key={player.name}
                        />
                      ) : (
                        <div className="nameOfZone-field-wrapper" key={"x" + index}></div>
                      )
                    )}
                </div>
                <div className="row-zones-wrapper">
                  {zones.slice(3, 6).map((player, index) =>
                    player ? (
                      <IconOfPlayer
                        player={player}
                        zones={zones}
                        type={"rival"}
                        key={player.name}
                      />
                    ) : (
                      <div className="player-field-wrapper zone-names-wrapper" key={"_" + index}>
                        <div>{correctNamesOfZones(index + 3)}</div>
                      </div>
                    )
                  )}
                </div>
                <div className="row-zones-wrapper">
                  {myTeamZones
                    .slice(3, 6)
                    .map((player, index) =>
                      player ? (
                        <IconOfPlayer
                          player={player}
                          zones={myTeamZones}
                          type={"my"}
                          key={player.name}
                        />
                      ) : (
                        <div className="nameOfZone-field-wrapper" key={"x" + index}></div>
                      )
                    )}
                </div>
                {!zones.includes(null) && admin && (
                  <div style={{ marginTop: 5 }}>
                    <Button onClick={saveStartingSix} value={"Save starting six"} />
                  </div>
                )}
                {myTeamZones.every((zone) => zone !== null) && isRegistratedUser && (
                  <div className="plusMinus">
                    <button onClick={() => dispatch(rotateForwardMyTeam())}>-</button>
                    {myTeamZones.map((player, index) =>
                      player && player.position === "Setter" ? (
                        <span key={player.name}>{correctNamesOfZones(index)}</span>
                      ) : null
                    )}
                    <button onClick={() => dispatch(rotateBackMyTeam())}>+</button>
                  </div>
                )}
                {showRivalClub && isRegistratedUser && (
                  <div className="showRatings">
                    <NavLink to={"/Ratings"} onClick={() => dispatch(setInfoOfPlayer(null))}>
                      Ratings
                    </NavLink>
                    <NavLink to={"/Distribution"}>Distribution</NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      {showRivalClub &&
        (showMyClub ? (
          <Squads team={"my"} />
        ) : (
          <section className="teamsquad-section">
            <div className="section-border">
              <div className="section-background"></div>
            </div>
            <div className="section-content-wrapper">
              <div className="section-content">
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
            </div>
          </section>
        ))}
    </article>
  );
}
