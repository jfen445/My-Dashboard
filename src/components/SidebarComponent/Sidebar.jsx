import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import calendar from "./images/calendar.png";
import moon from "./images/moon.png";
import music from "./images/music.png";
import profile from "./images/profile.png";
import stocks from "./images/stocks.png";
import styles from "../../styling/SidebarComponent.module.scss";

function Sidebar() {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <ButtonBase>
            <Link to="/" className="nav-link">
              <img
                alt=""
                src={profile}
                height={80}
                width={80}
                className={styles.profileSpacing}
              />
            </Link>
          </ButtonBase>
        </div>
        <div>
          <ButtonBase>
            <Link to="/calendar" className="nav-link">
              <img
                alt=""
                src={calendar}
                height={48}
                width={48}
                className={styles.buttonSpacing}
              />
            </Link>
          </ButtonBase>
        </div>
        <div>
          <ButtonBase>
            <Link to="/music" className="nav-link">
              <img
                alt=""
                src={music}
                height={48}
                width={48}
                className={styles.buttonSpacing}
              />
            </Link>
          </ButtonBase>
        </div>
        <div>
          <ButtonBase>
            <Link to="/stocks" className="nav-link">
              <img
                alt=""
                src={stocks}
                height={48}
                width={48}
                className={styles.buttonSpacing}
              />
            </Link>
          </ButtonBase>
        </div>
        <div>
          <ButtonBase>
            <Link to="/" className="nav-link">
              <img
                alt=""
                src={moon}
                height={48}
                width={48}
                className={styles.buttonSpacing}
              />
            </Link>
          </ButtonBase>
        </div>
      </Grid>
    </>
  );
}

export default Sidebar;
