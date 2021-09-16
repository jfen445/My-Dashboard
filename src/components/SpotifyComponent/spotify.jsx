import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import SpotifyWebApi from "spotify-web-api-js";
import { usePost, usePut } from "../../utils/crudHooks";
import styles from "../../styling/SpotifyComponent.modules.scss";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000/";
const clientID = "66ea4aba7f9344fea526f6a5bf14d6bf";

function fetchAccessToken() {
  let token = "grant_type=authorization_code";
  token +=
    "&code=" +
    "AQCp99V3OQxcUvw2_UkoAU6DWIW1J1WJZNKX9aBXMp218a-lZ_wXUzbeaMiDZDCp-XgmO2XusKFoE133cmSscO8Rcy7e06Hzu6h_PT6cWlhQuUFL-Tr_i4NgtmbxztVWAnl53TAO53jQ0PC9jDZYddvR7eZZzLxxQSk";
  token += `&redirect_uri=${redirectURI}`;
  token += `&client_id=${clientID}`;
  token += `&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`;

  return token;
}

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
  console.log(window.location.hash);
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      const parts = item.split("=");
      // eslint-disable-next-line no-param-reassign
      initial[parts[0]] = decodeURIComponent(parts[1]);
      console.log(parts[0]);
      return initial;
    }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const spotify = new SpotifyWebApi();

const handleClickPause = () => {
  spotify.pause();
};
const handleClickPlay = () => {
  spotify.play();
};

function Spotify() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const ttoken = hash.access_token;
    console.log("okay");

    if (ttoken) {
      setToken(ttoken);
      // giving the access token to that spotify api
      spotify.setAccessToken(ttoken);
      console.log(ttoken);
      spotify.getMe().then((user) => {
        console.log("person", user);
      });
    }
    console.log("i have a token", token);
  });
  return (
    // <div className={styles.wrapper}>
    //   <Grid>
    //     <Grid item xs={6} sm={3}>
    //       <ButtonBase onClick={handleClickPause}>Pause</ButtonBase>
    //     </Grid>
    //     <Grid item xs={6} sm={3}>
    //       <ButtonBase onClick={handleClickPlay}>Play</ButtonBase>
    //     </Grid>
    //   </Grid>
    // </div>
    <div className={styles.wrapper}>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={3} className={styles.center}>
          <ButtonBase onClick={handleClickPause}>Pause</ButtonBase>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.center}>
          <Grid>
            <Grid item>
              <Typography>Song</Typography>
              <Typography className={styles.description}>Aritist</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={3} className={styles.center}>
          <Typography>
            <ButtonBase onClick={handleClickPlay}>Play</ButtonBase>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Spotify;
