export function reduce(arr, sum = 0) {
  return arr.reduce((a, b) => a + b, sum);
}
export function correctNamesOfZones(index) {
  const zones = ["P4", "P3", "P2", "P5", "P6", "P1"];
  return zones[index];
}
export function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

const jsonRequest = (url, options) => {
  return fetch(url, {
    headers: { "content-type": "application/json" },
    ...options,
  }).then((res) => res.json());
};
export const fetchTeams = () => {
  const options = { method: "GET" };
  const req = jsonRequest("/clubs.json", options);
  return req;
};
export const fetchPlayers = () => {
  const options = { method: "GET" };
  const req = jsonRequest("/players.json", options);
  return req;
};
export const saveTeam = (club) => {
  const options = { body: JSON.stringify(club), method: "PUT" };
  const req = jsonRequest(`/clubs.json/${club.id}`, options);
  return req;
};
export const savePlayer = (player) => {
  const options = { body: JSON.stringify(player), method: "PUT" };
  const req = jsonRequest(`/players.json/${player.id}`, options);
  return req;
};
