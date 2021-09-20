import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useGet } from "../../utils/crudHooks";
import styles from "../../styling/WeatherComponent.module.scss";

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
    <div className={styles.wrapper}>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={3} className={styles.center}>
          <ButtonBase onClick={handleClick}>
            <img
              alt=""
              src={`http://openweathermap.org/img/wn/${weatherInfo?.weather[0]?.icon}@2x.png`}
              height={80}
              width={80}
              className={styles.image}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.center}>
          <Grid>
            <Grid item>
              <Typography className={styles.location}>Auckland</Typography>
              <Typography className={styles.description}>
                {weatherInfo?.weather[0]?.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={3} className={styles.center}>
          <Typography className={styles.temp}>
            {Math.trunc(weatherInfo?.main?.temp)} °C
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Weather;
