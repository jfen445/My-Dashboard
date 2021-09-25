import React from "react";
import { Grid } from "@material-ui/core";
import Weather from "../../components/WeatherComponent/Weather";
import SpotifyPlayer from "../../components/SpotifyComponent/SpotifyPlayer";
import { accessUrl } from "../../components/SpotifyComponent/Spotify";
import Time from "../../components/CurrentTimeComponent/Time";
import Sidebar from "../../components/SidebarComponent/Sidebar";
import Reminder from "../../components/RemindersComponent/Reminder";
import styles from "../../styling/HomePage.module.scss";

export default function MusicPage() {
  return (
    <>
      <Grid
        // going accross
        container
        direction="column"
        justifyContent="full"
        alignItems="stretch"
        className={styles.full}
      >
        <Grid style={{ background: "black" }}>hello</Grid>
        <Grid
          // going accross
          container
          direction="columns"
          justifyContent="full"
          alignItems="stretch"
          className={styles.full}
        >
          <Grid style={{ background: "black" }}>
            <div className={styles.navbar}>
              <Sidebar />
            </div>
          </Grid>
          <Grid style={{ background: "grey" }}>
            <div className={styles.myDashboard}>My Spotify</div>
            <div className={styles.time}>
              <Time />
            </div>
            <div className={styles.blocks}>
              <SpotifyPlayer />
            </div>
            <a href={accessUrl}>LOGIN TO SPOTIFY</a>
          </Grid>

          <Grid style={{ background: "black" }}>Hello</Grid>
        </Grid>
        <Grid style={{ background: "black" }}>hello</Grid>
      </Grid>
    </>
  );
}
