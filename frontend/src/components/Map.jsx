import L from 'leaflet';
import { useRef } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const Map = ({ latitude, longitude, onChange }) => {
  const markerRef = useRef(null);

  if (!latitude || !longitude) return <p>Loading map...</p>;

  const handlePinDrag = () => {
    const marker = markerRef.current;
    if (marker) {
      const { lat, lng } = marker.getLatLng();
      onChange({ latitude: lat, longitude: lng });
    }
  };

  const userIcon = new L.icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

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
        <Marker
          position={[latitude, longitude]}
          draggable={true}
          eventHandlers={{ dragend: handlePinDrag }}
          ref={markerRef}
          icon={userIcon}
        />
      </MapContainer>
    </>
  );
};

export default Map;
