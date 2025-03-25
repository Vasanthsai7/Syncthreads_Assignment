import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { fetchDashboardData } from "../api";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import "./Dashboard.css";

const Dashboard = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData(token);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        navigate("/login");
      }
    };
    loadData();
  }, [navigate, token]);

  return (
    <>
      <Header />
      <Container className="container">
        <Typography variant="h4" className="dashboard-title">
          Dashboard - Select a Location
        </Typography>
        <Grid container spacing={3} className="grid-container">
          {locations.map((location, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                className="location-card"
                onClick={() => navigate(`/map/${location.name}`)}
              >
                <CardMedia
                  component="img"
                  className="card-image"
                  image={location.image}
                  alt={location.name}
                />
                <CardContent className="card-content">
                  <Typography className="card-title">
                    {location.name}
                  </Typography>
                  <Typography className="card-description">
                    {location.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
