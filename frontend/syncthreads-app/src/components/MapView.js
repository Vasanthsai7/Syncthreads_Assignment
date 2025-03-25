import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { fetchMapData } from "../api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button, Container, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

const MapView = () => {
  const { location } = useParams(); // Get location from URL
  const [mapConfig, setMapConfig] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMapData(token, location);
        setMapConfig(data.coordinates); // Store only coordinate data
      } catch (error) {
        console.error("Error fetching map data:", error);
        navigate("/login");
      }
    };
    loadData();
  }, [navigate, token, location]);

  if (!mapConfig) return <Typography>Loading map...</Typography>;

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" gutterBottom>
          Map View: {location}
        </Typography>
        <MapContainer
          center={[mapConfig.latitude, mapConfig.longitude]}
          zoom={mapConfig.zoom}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[mapConfig.latitude, mapConfig.longitude]}>
            <Popup>{location}</Popup>
          </Marker>
        </MapContainer>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Container>
    </>
  );
};

export default MapView;
