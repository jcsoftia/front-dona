import React, { useState, useEffect } from "react";

import Map from "../Shared/Components/UIElements/Map";
import FormHelp from "./FormHelp";
import LoadingSpinner from "../Shared/Components/UIElements/LoadingSpinner";

const Help = () => {
  const [ coordinates, setCoordinates] = useState({
    lat: "",
    lng: "",
  });
  // const [longitude, setLongitude] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      //check if geolocation is available
      console.log("aqui");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("entre");
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          // setLongitude(position.coords.longitude);
          // console.log("mi coordenada", latitude);
          setLoading(false);
          setError(null);
        },
        (e) => {
          setCoordinates({ lat: -12.0681, lng: -75.2106 });
          console.log(e);
          setLoading(false);
          // setError(e);
        }
      );
      // setLoading(false);
      return null;
    } else {
      new Error("No GPS founded");
      setError(true);
      setLoading(false);
    }
  };

  const handleLocation = (lat, lng) => {
    setCoordinates({ lat: lat, lng: lng });
  };
  useEffect(() => {
    getLocation();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <h1>
        <br />
        <br />
        <br />
        Error
      </h1>
    );
  }
  if (loading && !error) {
    return <LoadingSpinner asOverlay/>;
  }
  if (!loading && !error && coordinates) {
    return (
      <>
        <Map
          draggable={true}
          location={coordinates}
          zoom={15}
          handleLocation={handleLocation}
        />
        <FormHelp
          location={coordinates}
          handleLocation={handleLocation}
        />
      </>
    );
  }
};

export default Help;
