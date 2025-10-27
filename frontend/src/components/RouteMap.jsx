import { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import api from '../api/axios';

const RouteMap = ({ stop, direction }) => {
  const latitude = parseFloat(stop.stop_lat);
  const longitude = parseFloat(stop.stop_lon);

  const shapeId = direction.shape_id;

  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const fetchShapeData = async () => {
      try {
        const response = await api.get(`/shapes/${shapeId}`);
        setShapes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShapeData();
  }, [shapeId]);

  const polyline = shapes.map((s) => [
    parseFloat(s.shape_pt_lat),
    parseFloat(s.shape_pt_lon),
  ]);

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
        <Polyline pathOptions={{ color: 'red' }} positions={polyline} />
      </MapContainer>
    </>
  );
};

export default RouteMap;
