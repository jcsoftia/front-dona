import React, { useState, useEffect, useRef } from "react";
import "./Map.css";
// import '../../Library/Maps'
const gMap = (ref, options) => new window.google.maps.Map(ref, options);
const gMarker = (options) => new window.google.maps.Marker(options);
const position = (lat, lng) => new window.google.maps.LatLng(lat, lng);
let marker = null
let map = null
const Map = ({ users, location, draggable, zoom, handleLocation }) => {
  const mapRef = useRef();
  const [coordinates, setCoordinates] = useState([
    Number(location.lat),
    Number(location.lng),
  ]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCoordinates([
      Number(location.lat),
      Number(location.lng),
    ]);
    return () => {};
  }, [location]);

  const loadMap = async (ref, lat, lng, zoom) => {
    console.log("zoom", zoom);
    if (!loaded) {
      map = await (
        gMap(ref, {
          center: {
            lat: lat || -9.860821,
            lng: lng || -75.164101,
          },
          zoom: zoom || 6,
        })
      );
    }
  };

  const loadMarker = async (map, lat, lng) => {
      console.log(map, lat, lng);
      // if (!loaded) {
        marker = await 
        gMarker({
          position: {
            lat: lat || -9.860821,
            lng: lng || -75.164101,
          },
          map:map,
          draggable: true,
          title: "Drag me!",
        });
      // }
  };

  useEffect(() => {
    // const [ lat, lng ] = coordinates;
    // const map = async()=>await loadMap(mapRef.current, lat, lng, zoom);
    // return () => {
      
    // };
    // map()
  }, []);

  useEffect(() => {
    console.log('in use Effect');
    const init = async (e) => {
      const [ lat, lng ] = coordinates;
      await loadMap(mapRef.current, lat, lng, zoom);
      console.log("map", map);
      setLoaded(true);
      // just if is draggable
      if (draggable) {
        marker && marker.setMap(null);
        await loadMarker(map, lat, lng);
        if (marker && map) {
          marker.setPosition(position(lat, lng));
          map.panTo(position(lat, lng));
          console.log("marker in", marker);
          window.google.maps.event.addListener(marker, "dragend", (evt) => {
            console.log('se movio');
            handleLocation(
              evt.latLng.lat().toFixed(6),
              evt.latLng.lng().toFixed(6)
            );
            map.panTo(evt.latLng);
          });
        }
        // console.log("set position", marker.setPosition(position));
      } else if(!draggable && map!==null){
        const popUp = new window.google.maps.InfoWindow();
        users.map((user) => {
          let aux = [];
          let icon;
          let stringHTML = "";

          user.products.map((product) => {
            aux.push(product.state);
            stringHTML =
              stringHTML +
              `<h3>${product.productName}</h3> <p>${product.description}</p> <hr/>`;
            return null;
          });

          let index = aux.findIndex((e) => e === false);

          if (index === -1) {
            icon = "../../../../Helped.png";
          } else {
            icon = "../../../../Help.png";
          }
          const marker2 = new window.google.maps.Marker({
            position: user.location,
            map,
            icon,
          });
          marker2.addListener("click", () => {
            popUp.setContent(
              `<h1>${user.name} <br/> ${user.cellphone}</h1>` + stringHTML
            );
            popUp.open(map, marker2);
          });
          return null;
        });
      }
    };
    init();
    return () => {
      marker && marker.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  return <div ref={mapRef} className="map-container"></div>;
};

export default Map;
