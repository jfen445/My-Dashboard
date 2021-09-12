import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useGet } from "../../utils/crudHooks";
import styles from "../../styling/WeatherComponent.module.scss";
import cloudimg from "./images/cloudrain.png";

function Weather() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const { reFetch } = useGet(
    `http://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
    setWeatherInfo
  );
  useEffect(() => {
    reFetch();
  }, []);
  console.log(Math.random());
  console.log(weatherInfo?.weather.main);

  //   const weather = getWeather();
  //   console.log(weather);

  const lon = weatherInfo?.coord?.lon;
  const lat = weatherInfo?.coord?.lat;
  const handleClick = () => {
    window.open(`https://weather.com/weather/today/l/${lat},${lon}?par=google`);
  };

  return (
    <div className={styles.box}>
      <Grid container spacing={1}>
        <Grid item>
          <ButtonBase
            className={styles.image}
            style={{ alignSelf: "center" }}
            onClick={handleClick}
          >
            <img alt="" src={cloudimg} height={50} width={50} />
          </ButtonBase>
        </Grid>
        <Grid item>
          <Grid spacing={2} style={{ alignSelf: "center" }}>
            <Grid item xs>
              <Typography className={styles.location}>Auckland</Typography>
              <Typography className={styles.description}>
                {weatherInfo?.weather[0]?.description}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className={styles.temp}>
              {Math.trunc(weatherInfo?.main?.temp)} °C
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Weather;
