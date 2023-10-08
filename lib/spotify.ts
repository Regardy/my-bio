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
      grant_type: 'refresh_token',
      refresh_token: `AQDUNCIIXgukPy4XEqSpGjgxSz18yGcHsKFI-90F7eiTbhG66z9YGw8fyKW3lduA2m-OjYNNbW-XdS-HitUVE3ZP44aNcW4XFsuxMOzxW9UXnZqX_jg-eGeFH30iwAU50rrdTJiBJod5WRcXme4y4XKX9E4b50mIJl9UHN7lZYA_k4ocAVeY7h6Bpo5wmgtkXK9WRmdLtGaRKSrJnA3vt42DOunvyT44QcI_BkGOcQndMVxlzfuBAerGLq5-MmLfoy8E1bA1lfBGiyzkk9vb2PxwTckNgRFAqqtvWBMswTVRcaA29Ew_BdefPg9yKPWRKpSVpU01U0aT7zJ6oyOsS293VcjBOf2sXmB9n9hueYZHB3jdkWboOEWpB0XZseVWRBmSSbB6ItI1OkGVwJdgF1EhVEdA0QH45fRmczaKqBaq7ph7pBLB-yHyDbjcH9gko3a7RDK1afkZY4z3P49_xui1oJYoCDATwDaACdZl67B69D6r7Yhl9xRx1OFhpwY3IrGxh3CMf4l0eXzrJpJwpSPO102KrnQ16TWOuOPFgUNGm6L50WoFFgkmIwfhCUWmAgZfQFKQQhrd1RQbomGKA9ZZ9_T1MYkk1HvZ3cstn6IAzbWocsdkfGqkHwTuv7gEvOD3SNozDC0F-0tsLmRBaEbIc08Z4LiOKBWm6eg8D420v5x-RV_JVQV2g6VI_Q9Dk_fzgzzUZ8GgT23arOUsBmPsR7FT0P8qhr81uMeST5E`,
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
