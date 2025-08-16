import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locations from '../../../public/locations.json';

// Optional: Fix for default marker icon (Leaflet issue)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const LocationSection = () => {
  const validLocations = locations.filter(loc => loc.latitude && loc.longitude);
  const center = [23.75, 90.39]; // Dhaka default center

  return (
    <section data-aos="zoom-in" className="my-12 px-4 md:px-16">
      <h2 className="text-3xl font-bold mb-6 text-center">📍 Our Locations</h2>

      <div className="mb-8 text-center">
        <p className="text-lg">
          Visit any of our branches across Dhaka city. Find the nearest EA Sports facility and start your journey today!
        </p>
      </div>

      <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md">
        <MapContainer center={center} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {validLocations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                {loc.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default LocationSection;
