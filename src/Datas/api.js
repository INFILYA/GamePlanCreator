export const SERVER_URL = "http://localhost:3000";
const jsonRequest = (url, options = {}) => {
  return fetch(SERVER_URL + url, {
    headers: { "content-type": "application/json" },
    ...options,
  })
    .then(console.log("async => DONE"))
    .then((res) => res.json());
};
export const fetchPlayersApiCall = () => {
  const options = { method: "GET" };
  const req = jsonRequest(`/players`, options);
  return req;
};
export const fetchTeamsApiCall = () => {
  const options = { method: "GET" };
  const req = jsonRequest(`/clubs`, options);
  return req;
};
export const savePlayer = (player) => {
  const options = { body: JSON.stringify(player), method: "PUT" };
  const req = jsonRequest(`/players/${player.id}/`, options);
  return req;
};
export const saveTeam = (team) => {
  const options = { body: JSON.stringify(team), method: "PUT" };
  const req = jsonRequest(`/clubs/${team.id}/`, options);
  return req;
};

export const fetchPlayerInformation = (player) => {
  const options = { method: "GET" };
  const req = jsonRequest(`/players/${player.id}/`, options);
  return req;
};
