import express from "express";
import pool from "./db.js";
import { haversineDistance } from "./distance.js";

const router = express.Router();

let cachedStops = [];

const getStops = async () => {
  try {
    const query = `
      SELECT *
      FROM stops
    `;
    const response = await pool.query(query);
    console.log("Cached stops");
    cachedStops = response.rows;
  } catch (error) {
    console.error(error);
  }
};

getStops();

// return all stops less than 0.2 miles away from user
router.get("/nearby", async (req, res) => {
  const { latitude, longitude } = req.query;
  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);
  const nearbyStops = cachedStops
    .map(stop => {
      const dist = haversineDistance(
        userLat,
        userLon,
        stop.stop_lat,
        stop.stop_lon
      );
      return { ...stop, dist };
    })
    .filter(stop => {
      return stop.dist <= 0.2;
    })
    .sort((a, b) => a.dist - b.dist);

  res.json(nearbyStops);
});

router.get("/routes", async (req, res) => {
  try {
    const query = `
      SELECT route_id, route_short_name, route_long_name FROM routes
      ORDER BY CASE WHEN route_id ~ '^[A-Za-z]+$' THEN 0 ELSE 1 END,
      CASE WHEN route_id ~ '^[0-9]+' THEN CAST(regexp_replace(route_id, '[^0-9].*$', '', 'g') AS integer) ELSE NULL END,
      route_id
    `;
    const response = await pool.query(query);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/trips/:routeId", async (req, res) => {
  const { routeId } = req.params;
  try {
    const query = `
      SELECT DISTINCT direction_id, MIN(trip_headsign) AS trip_headsign
      FROM trips
      WHERE route_id = $1
      GROUP BY direction_id
      ORDER BY direction_id
    `;
    const response = await pool.query(query, [routeId]);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/stops/:routeId/:directionId", async (req, res) => {
  const { routeId, directionId } = req.params;
  try {
    const query = `
      SELECT *
      FROM stops_list
      WHERE route_id = $1 AND direction_id = $2
      ORDER BY stop_sequence;
    `;
    const response = await pool.query(query, [routeId, directionId]);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
