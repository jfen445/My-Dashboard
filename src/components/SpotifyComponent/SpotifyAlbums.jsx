import React, { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import ButtonBase from "@material-ui/core/ButtonBase";
import styles from "../../styling/SpotifyPage/AlbumsComponent.module.scss";
// import { useSetTrack } from "./PlaylistIDComponent";
import { spotifyObject } from "./Spotify";

function SpotifyAlbums() {
  const [albumImages, setAlbumImages] = useState([]);
  const [albumNames, setAlbumNames] = useState([]);
  const [playlistID, setPlaylistID] = useState([]);

  useEffect(() => {
    spotifyObject
      .getUserPlaylists() // note that we don't pass a user id
      .then((response) => {
        setPlaylistID(response.items.map((n) => n.id));
        setAlbumImages(response?.items);
        setAlbumImages(
          response.items.map((im) => im.images.map((hi) => hi.url))
        );
        setAlbumNames(response.items.map((n) => n.name));
      });
  });

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 200, itemsToShow: 2 },
    { width: 500, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
  ];

  // const handleClick = () => {
  //   console.log("fefeafefefe", albumImage);
  //   // setTrackToGet(albumImage?.);
  // };

  return (
    <>
      <div className={styles.wrapper}>
        <Carousel breakPoints={breakPoints}>
          {albumImages.map((albumImage, index) => (
            <>
              {/* onClick={setTrackToGet(playlistID[index])} */}
              <ButtonBase>
                <img alt="" src={albumImage[0]} height={160} width={160} />
              </ButtonBase>
            </>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default SpotifyAlbums;
