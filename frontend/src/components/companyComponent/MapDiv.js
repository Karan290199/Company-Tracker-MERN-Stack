import React from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapDiv = ({ latitude, longitude }) => {
  return (
    <div>
      <Map style={{
        position: "relative",
        width: "300px",
        height: "200px"
      }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 4
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={false}
        />
        <Marker
              longitude={longitude}
              latitude={latitude}
        />
      </Map>
    </div>
  );
};

export default MapDiv;
