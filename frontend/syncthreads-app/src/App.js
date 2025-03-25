import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import MapView from "./components/MapView";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/map/:location"
        element={
          <PrivateRoute>
            <MapView />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
