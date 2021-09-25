import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import SpotifyWebApi from "spotify-web-api-js";
import styles from "../../styling/SpotifyPage/SpotifyPlayer.module.scss";
import play from "./images/playCircle.png";
import next from "./images/next.png";
import previous from "./images/previous.png";
import pause from "./images/pause2.png";
// eslint-disable-next-line import/no-duplicates
import { spotifyObject } from "./Spotify";

// const handleClickPause = () => {
//   spotifyObject.pause();
//   setImage(play);
// };

const handleClickSkip = () => {
  spotifyObject.skipToNext();
};
const handleClickPrevious = () => {
  spotifyObject.skipToPrevious();
};

function Spotify() {
  const [token, setToken] = useState(null); // to set the spotify authorization token
  const [song, setSong] = useState(null); // song name
  const [artist, setArtist] = useState(null); // song artitst
  const [image, setImage] = useState(null); // song album image
  const [playBackStatus, setPlayBackStatus] = useState(null); // if song is playing or not
  const [playPause, setPlayPause] = useState(null); // play pause image

  useEffect(() => {
    // const hash = getTokenFromResponse();
    // window.location.hash = "";
    // const ttoken = hash.access_token;
    // console.log("okay");
    spotifyObject.getMe().then((user) => {
      console.log("person", user);
    });
    spotifyObject
      .getMyCurrentPlayingTrack("37i9dQZEVXcJZyENOWUFo7")
      .then((response) => {
        setSong(response?.item?.name);
        setImage(response.item?.album?.images?.[2].url);
        setArtist(response?.item?.artists?.[0]?.name);
        setPlayBackStatus(response?.is_playing);
      });
    spotifyObject
      .getMyCurrentPlaybackState("37i9dQZEVXcJZyENOWUFo7")
      .then((response) => {
        if (response) {
          setPlayPause(pause);
        } else {
          setPlayPause(play);
        }
      });
  });

  // method that toggles the play pause image
  const playPauseToggle = () => {
    if (playBackStatus) {
      spotifyObject.pause();
      setPlayPause(play);
      setPlayBackStatus(false);
    } else {
      spotifyObject.play();
      setPlayPause(pause);
      setPlayBackStatus(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          <Typography className={styles.nowPlaying}>Now Playing</Typography>
        </Grid>
        <Grid>
          <div>
            <img
              alt=""
              src={image}
              height={200}
              width={200}
              className={styles.center}
            />
          </div>
        </Grid>
        <Grid className={styles.center}>
          <Typography className={styles.song}>{song}</Typography>
        </Grid>
        <Grid className={styles.center}>
          <Typography className={styles.artist}>{artist}</Typography>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
          item
        >
          <Grid>
            <ButtonBase onClick={() => handleClickPrevious()}>
              <img alt="" src={previous} height={40} width={40} />
            </ButtonBase>
          </Grid>
          <Grid>
            <ButtonBase onClick={() => playPauseToggle()}>
              <img
                alt=""
                src={playPause}
                height={70}
                width={70}
                className={styles.playPause}
              />
            </ButtonBase>
          </Grid>
          <Grid>
            <ButtonBase onClick={() => handleClickSkip()}>
              <img alt="" src={next} height={40} width={40} />
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Spotify;
