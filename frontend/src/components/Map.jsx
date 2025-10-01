import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const Map = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return <p>Loading map...</p>;

  return (
    <>
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} />
      </MapContainer>
    </>
  );
};

export default Map;
