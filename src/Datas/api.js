export const SERVER_URL = "http://localhost:3000";
const jsonRequest = (url, options = {}) => {
  return fetch(SERVER_URL + url, {
    headers: { "content-type": "application/json" },
    ...options,
  });
};
export const fetchPlayer = () => {
  const options = { method: "GET" };
  const req = jsonRequest(`/players`, options);
  return req;
};
export const savePlayer = (player) => {
  const options = { body: JSON.stringify(player), method: "PUT" };
  const req = jsonRequest(`/players/${player.id}`, options);
  return req;
};
