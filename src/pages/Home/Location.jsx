import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Location = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('./locations.json') 
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error('Error loading locations:', err));
  }, []);

  return (
    <div className="my-16 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Our Service Locations
      </h2>

      <MapContainer
        center={[23.76, 90.39]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: '500px', width: '100%', borderRadius: '12px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              {loc.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Location;
