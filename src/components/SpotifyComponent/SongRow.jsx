import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Carousel from "react-elastic-carousel";
import Typography from "@material-ui/core/Typography";
import styles from "../../styling/SpotifyPage/SongRow.module.scss";

import { spotifyObject } from "./Spotify";

function SongRow({ track }) {
  //   const [track, setTrack] = useState(null); // song name
  //   spotifyObject
  //     .getMyCurrentPlayingTrack("37i9dQZEVXcJZyENOWUFo7")
  //     .then((response) => {
  //       setTrack(response?.item);
  //     });
  console.log(track);

  return (
    <Grid
      // going accross
      container
      direction="row"
      justifyContent="full"
      alignItems="stretch"
      className={styles.songRow}
    >
      <Grid>
        <img src={track?.album?.images[0]?.url} alt="" height={60} width={60} />
      </Grid>
      <Grid>
        <div className={styles.songRow__info}>
          <h1>{track?.name}</h1>
          <p>
            {/* {track?.artists.map((artist) => artist?.name).join(", ")} -{" "} */}
            {/* {track?.artists?.name} */}
            {/* {track?.album.name} */}
          </p>
        </div>
      </Grid>
    </Grid>
  );
}

export default SongRow;
