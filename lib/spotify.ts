const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
const refresh_token = `AQDjweIoiATYj9wxFyuAe67HDITj13WI_ZytSivHXDNJmQuATuO86XbWCY-dBSI31GcCTKSWN4B3yfGm81yYfiF9ud7AUnqwhPcwcyc9WvDJcwchZfApsCl7G2q2pI0whpTn6D4FKC4S14immasi1JAozHh0uDQ0a3GOsxxVRP44Hyz5oZ0WP19nDIr9m8htMvD0W1OfosN2Vt4gZQMDVPBO94kMHseJQxtsq1Vrp_S8rUtidzC5v4w6i9-_5qEvpkluEWOKLCJQUKt80oyHgf9eDjZ85kXYNMUHA02UqytrELFsK4PsIlX5NVwOzWfzQErMqDeDnxuoLS5-5gEqrIVDmiV8FuSXXeSYciqYDIAvTbzKzNPOZ6Y11mxs_uas27g5zDUS6ty3ZVgM_d0nXat82gFytyYdXDCwslrKnWOEk_3A3vyGVFp2CkMqCvm-DP7b2riRH6qaBVfYlqlduThmL0-mnLOmk4dSpX9efc71xvY9NTci269hcF2N2MuXmXY8WXbbzTWNfD8Xs6_HFNqKhWy9w8RNE7KYYsYKtw0CGsdUw7KBp6qB-X26IaRP-jEkB_J_4LKkOTZQwGrMpoPc5efhC0eppw03Y7ku6lZ8sUehOuqQz-aToQG-ElQThyXQCCvAKuDrbNEQIfvTs1xi_H8Teeh7mVWuiSQU4Ju3X950b1eqNP4mqHug7NZb-R-igmgcI82wX9ptwztZwhV9vHd0afSYHsv6vHhHVBU` as string;

const basic = Buffer.from(`5b76b895a0ce410cbbbb4ad01b7669f5:cc6baca12774436e9478fd94b2eb16c6`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_TRACKS_DEFAULT_PARAMS = {
  time_range: "short_term",
  limit: "5",
  offset: "0",
};
const TOKEN_ENDPOINT = `https://alecchen.dev/spotify-refresh-token`;

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
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();
  const queryParams = new URLSearchParams(TOP_TRACKS_DEFAULT_PARAMS).toString();
  return fetch(TOP_TRACKS_ENDPOINT + "?" + queryParams, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
