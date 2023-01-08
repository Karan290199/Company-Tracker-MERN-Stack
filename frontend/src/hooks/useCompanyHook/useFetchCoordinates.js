import React, { useEffect, useState } from "react";
import MapDiv from "../../components/companyComponent/MapDiv";
<pre>{process.env.REACT_APP_MAPBOX_TOKEN}</pre>;

const UseFetchCoordinates = ({ address }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  useEffect(() => {
    const fetchCoordinates = async (address) => {
      const { REACT_APP_MAPBOX_TOKEN } = process.env;
      const { area, country, state, city } = address;
      const resp = await fetch(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          area +
          " " +
          city +
          " " +
          state +
          ".json?autocomplete=false&types=region&limit=1&worldview=cn&country=" +
          country +
          "&access_token=" +
          REACT_APP_MAPBOX_TOKEN,
        {
          method: "GET",
        }
      );
      const json = await resp.json();
      if (resp.ok) {
        const coordinates = json.features[0].center;
        setLongitude(coordinates[0]);
        setLatitude(coordinates[1]);
      }
    };
    fetchCoordinates(address);
  }, [address, setLatitude, setLongitude]);
  return (
    <div>
      <p>
        <strong>Address </strong>
        {address.streetAddress} {address.area}<br/>
        {address.city} {address.state} {address.zipCode}
      </p>
      <div>
        {latitude && longitude && (
          <MapDiv latitude={latitude} longitude={longitude} />
        )}
      </div>
    </div>
  );
};

export default UseFetchCoordinates;
