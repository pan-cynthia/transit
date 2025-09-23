import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const Map = ({ userLocation }) => {
  if (!userLocation) return <p>Loading map...</p>;

  return (
    <>
      <MapContainer
        center={[userLocation.latitude, userLocation.longitude]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[userLocation.latitude, userLocation.longitude]} />
      </MapContainer>
    </>
  );
};

export default Map;
