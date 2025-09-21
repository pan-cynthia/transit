import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import { haversineDistance } from "./distance.js";

dotenv.config();

const app = express.Router();

let cachedStops = [];

const getStops = async () => {
  try {
    const response = await axios.get("https://api.511.org/transit/stops", {
      params: {
        api_key: process.env.TRANSIT_API_KEY,
        operator_id: "SF"
      }
    });
    cachedStops = response.data.Contents.dataObjects.ScheduledStopPoint;
    console.log("Cached stops");
  } catch (error) {
    console.log(error);
  }
};

getStops(); // call once when server starts

// return all stops less than 0.2 miles away from user
app.get("/nearby", async (req, res) => {
  const { latitude, longitude } = req.query;
  const userLat = parseFloat(latitude);
  const userLong = parseFloat(longitude);
  const nearbyStops = cachedStops
    .map(stop => {
      const dist = haversineDistance(
        userLat,
        userLong,
        stop.Location.Latitude,
        stop.Location.Longitude
      );
      return { ...stop, dist };
    })
    .filter(stop => {
      return stop.dist <= 0.2;
    })
    .sort((a, b) => a.dist - b.dist);

  res.json(nearbyStops);
});

export default app;
