import React, { useState, useEffect, useRef } from "react";
import "./Map.css";
// import '../../Library/Maps'
const gMap = (ref, options) => new window.google.maps.Map(ref, options);
const gMarker = (options) => new window.google.maps.Marker(options);
const position = (lat, lng) => new window.google.maps.LatLng(lat, lng);
let marker = null;
let map = null;
const Map = ({ users, location, draggable, zoom, handleLocation }) => {
  const mapRef = useRef();
  const [coordinates, setCoordinates] = useState([
    Number(location.lat),
    Number(location.lng),
  ]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCoordinates([Number(location.lat), Number(location.lng)]);
    return () => {};
  }, [location]);

  const loadMap = async (ref, lat, lng, zoom) => {
    if (!loaded) {
      map = await gMap(ref, {
        center: {
          lat: lat || -9.860821,
          lng: lng || -75.164101,
        },
        zoom: zoom || 6,
      });
    }
  };

  const loadMarker = async (map, lat, lng) => {
    // console.log(map, lat, lng);
    // if (!loaded) {
    marker = await gMarker({
      position: {
        lat: lat || -9.860821,
        lng: lng || -75.164101,
      },
      map: map,
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
    const init = async (e) => {
      const [lat, lng] = coordinates;
      await loadMap(mapRef.current, lat, lng, zoom);
      setLoaded(true);
      // just if is draggable
      if (draggable) {
        marker && marker.setMap(null);
        await loadMarker(map, lat, lng);
        if (marker && map) {
          marker.setPosition(position(lat, lng));
          map.panTo(position(lat, lng));
          window.google.maps.event.addListener(marker, "dragend", (evt) => {
            handleLocation(
              evt.latLng.lat().toFixed(6),
              evt.latLng.lng().toFixed(6)
            );
            map.panTo(evt.latLng);
          });
        }
        // console.log("set position", marker.setPosition(position));
      } else if (!draggable && map !== null) {
        const popUp = new window.google.maps.InfoWindow();
        users.map((user) => {
          let aux = [];
          let icon;
          let stringHTML = "";
          let donorClass = "";

          user.products.map((product) => {
            aux.push(product.state);
            donorClass = product.state ? "donated" : "available";
            stringHTML =
              stringHTML +
              `<h3 class = "${donorClass}">${product.productName} (${
                product.state ? "DONADO" : "DISPONIBLE"
              })</h3> <p class = "${donorClass}" >${
                product.description
              } </p> <hr/>`;
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
          marker2.addListener("click", (e) => {
            popUp.setContent(
              stringHTML +
                `<h1 class = "donorName" >Contacta con el donante: ${
                  user.name.split(" ")[0]
                }  ${user.name
                  .split(" ")
                  .map((x, key) => {
                    if (key===0) {
                      return ""
                    }
                    return (x + 1)[0]+"."
                  })
                  .join(
                    ""
                  )} <br/> <a onclick="(e)=>{console.log(e)}" href="tel:${
                  user.cellphone
                }" class="donor_button">📞 ${user.cellphone}</a></h1>`
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
