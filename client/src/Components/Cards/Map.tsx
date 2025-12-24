import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  latitude: number;
  longitude: number;
}

const MapComponent = ({ latitude, longitude }: MapProps) => {
useEffect(() => {
  const map = L.map("map", {
    center: [latitude, longitude],
    zoom: 15,
    dragging: false,         // Disable dragging
    touchZoom: false,        // Disable pinch zoom
    scrollWheelZoom: false,  // Disable scroll wheel zoom
    doubleClickZoom: false,  // Disable double click zoom
    boxZoom: false,          // Disable box zoom
    keyboard: false,         // Disable keyboard navigation
    zoomControl: false       // Hide zoom buttons
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([latitude, longitude]).addTo(map);

  return () => {
    map.remove(); // Clean up on unmount
  };
}, [latitude, longitude]);

  return <div id="map" style={{ zIndex: 0, width: "100%", height: "300px" }} />;
};

export default MapComponent;