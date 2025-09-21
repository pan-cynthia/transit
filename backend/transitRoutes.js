import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express.Router();

let cachedStops = [];

app.get("/stops", async (req, res) => {
  try {
    const response = await axios.get("https://api.511.org/transit/stops", {
      params: {
        api_key: process.env.TRANSIT_API_KEY,
        operator_id: "SF"
      }
    });
    cachedStops = response.data.Contents.dataObjects.ScheduledStopPoint;
    res.json(cachedStops);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch stops" });
  }
});

export default app;
