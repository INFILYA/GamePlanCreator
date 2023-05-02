export const SERVER_URL = "http://localhost:3000";
const jsonRequest = (url, options = {}) => {
  return fetch(SERVER_URL + url, {
    headers: { "content-type": "application/json" },
    ...options,
  }).then((res) => res.json());
};
export const fetchPlayers = () => {
  const options = { method: "GET" };
  const req = jsonRequest(`/players`, options);
  return req;
};
export const fetchClubs = () => {
  const options = { method: "GET" };
  const req = jsonRequest(`/clubs`, options);
  return req;
};
export const savePlayer = (player) => {
  const options = { body: JSON.stringify(player), method: "PUT" };
  const req = jsonRequest(`/players/${player.id}`, options);
  return req;
};

export const fetchPlayerInformation = (id) => {
  const options = { method: "GET" };
  const req = jsonRequest(`/players/${id}`, options);
  return req;
};
