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
        />
      </MapContainer>
    </>
  );
};

export default Map;
