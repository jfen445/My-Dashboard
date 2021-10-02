import React from "react";
import { Grid } from "@material-ui/core";
import Weather from "../../components/WeatherComponent/Weather";
import Spotify, { accessUrl } from "../../components/SpotifyComponent/Spotify";
import Time from "../../components/CurrentTimeComponent/Time";
import Sidebar from "../../components/SidebarComponent/Sidebar";
import styles from "../../styling/HomePage.module.scss";

export default function HomePage() {
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
            <div className={styles.myDashboard}>My Dashboard</div>
            <div className={styles.time}>
              <Time />
            </div>
            <div className={styles.blocks}>
              <Weather />
            </div>
            <div className={styles.blocks}>
              <Spotify />
            </div>
            <a href={accessUrl}>LOGIN TO SPOTIFY</a>
          </Grid>

          <Grid style={{ background: "black" }}>Hello</Grid>
        </Grid>
        <Grid style={{ background: "black" }}>hello</Grid>
      </Grid>

      {/* <Reminder /> */}
    </>
  );
}
