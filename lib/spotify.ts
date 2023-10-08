const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN as string;

const basic = Buffer.from(`5b76b895a0ce410cbbbb4ad01b7669f5:cc6baca12774436e9478fd94b2eb16c6`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_TRACKS_DEFAULT_PARAMS = {
  time_range: "short_term",
  limit: "5",
  offset: "0",
};
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer BQA3YbPMDwqNTCXudu5O-Z7ioUf9q29N14XLHJd_GGMMXWhSl36bJODhFjLSTAMgb7oph3968URXiwkkkbOoHKrRmEDegzs-eOzzaHa20IvRXg3Q70RVYRCpEKgqL_e7cq97ARgEdMFk5L7rud62c0JhI7BJ-Rqj9hEvq45r_7XtRYYO86kR88afSQA9fC12_nuXuQef8s5HhHB4GTqHKASUBwCLuWoSx_xU120_ae5dh0yjHIzcJ1iCA48W2dlvva6cfOoD_mKHGw8EY3d9LjC0QcM3e39dGWjZMV1cGin5jXm7Bedp0-y9NxuHNcIu5rjRR4ATSL430wr97r_H`,
    },
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();
  const queryParams = new URLSearchParams(TOP_TRACKS_DEFAULT_PARAMS).toString();
  return fetch(TOP_TRACKS_ENDPOINT + "?" + queryParams, {
    headers: {
      Authorization: `Bearer BQA3YbPMDwqNTCXudu5O-Z7ioUf9q29N14XLHJd_GGMMXWhSl36bJODhFjLSTAMgb7oph3968URXiwkkkbOoHKrRmEDegzs-eOzzaHa20IvRXg3Q70RVYRCpEKgqL_e7cq97ARgEdMFk5L7rud62c0JhI7BJ-Rqj9hEvq45r_7XtRYYO86kR88afSQA9fC12_nuXuQef8s5HhHB4GTqHKASUBwCLuWoSx_xU120_ae5dh0yjHIzcJ1iCA48W2dlvva6cfOoD_mKHGw8EY3d9LjC0QcM3e39dGWjZMV1cGin5jXm7Bedp0-y9NxuHNcIu5rjRR4ATSL430wr97r_H`,
    },
  });
};
