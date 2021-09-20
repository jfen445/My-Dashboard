import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import SpotifyWebApi from "spotify-web-api-js";
import styles from "../../styling/SpotifyComponent.module.scss";
import play from "./images/play.png";
import pause from "./images/pause.png";
import skip from "./images/skip.png";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000/";
const clientID = "66ea4aba7f9344fea526f6a5bf14d6bf";

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

const spotifyObject = new SpotifyWebApi();

// const handleClickPause = () => {
//   spotifyObject.pause();
//   setImage(play);
// };

const handleClickSkip = () => {
  spotifyObject.skipToNext();
};

function Spotify() {
  const [token, setToken] = useState(null);
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState(null);
  const [image, setImage] = useState(null);
  const [playBackStatus, setPlayBackStatus] = useState(null);
  const [playPause, setPlayPause] = useState(null);

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const ttoken = hash.access_token;
    console.log("okay");

    if (ttoken) {
      setToken(ttoken);
      // giving the access token to that spotify api
      spotifyObject.setAccessToken(ttoken);
      console.log(ttoken);
      spotifyObject.getMe().then((user) => {
        console.log("person", user);
      });
      spotifyObject
        .getMyCurrentPlayingTrack("37i9dQZEVXcJZyENOWUFo7")
        .then((response) => {
          console.log(response);
          console.log("==========================");
          console.log(response?.item?.name);
          console.log("==========================");
          setSong(response?.item?.name);
          setImage(response.item?.album?.images?.[2].url);
          setArtist(response?.item?.artists?.[0]?.name);
          setPlayBackStatus(response?.is_playing);
          console.log(response.item?.album?.images?.[2]?.url);
          console.log();
        });
      spotifyObject
        .getMyCurrentPlaybackState("37i9dQZEVXcJZyENOWUFo7")
        .then((response) => {
          console.log(response);
        });
    }
  });

  const handleClickPlay = () => {
    if (spotifyObject.getMyCurrentPlaybackState()) {
      spotifyObject.pause();
      setPlayPause(play);
    } else {
      spotifyObject.play();
      setPlayPause(pause);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4} sm={4} className={styles.center}>
          <img
            alt=""
            src={image}
            height={80}
            width={80}
            className={styles.image}
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <Grid>
            <Grid item>
              <Typography className={styles.song}>{song}</Typography>
              <Typography className={styles.artist}>{artist}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={2} className={styles.wrapper}>
          <ButtonBase onClick={handleClickPlay}>
            <img alt="" src={playPause} height={50} width={50} />
          </ButtonBase>
        </Grid>
        <Grid item xs={2} sm={2}>
          <ButtonBase onClick={handleClickSkip}>
            <img
              alt=""
              src={skip}
              height={50}
              width={50}
              className={styles.image}
            />
          </ButtonBase>
        </Grid>
      </Grid>
    </div>
  );
}

export default Spotify;
