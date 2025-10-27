import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const RouteMap = ({ stop }) => {
  const latitude = parseFloat(stop.stop_lat);
  const longitude = parseFloat(stop.stop_lon);

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
        <Marker position={[latitude, longitude]}>
          <Popup>{stop.stop_name}</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default RouteMap;
