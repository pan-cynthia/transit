import express from "express";
import pool from "./db.js";

const router = express.Router();

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
    // get trip_id of longest trip (most stops)
    const query1 = `
      SELECT t.trip_id FROM trips t
      JOIN stop_times st ON t.trip_id = st.trip_id
      WHERE route_id = $1 AND direction_id = $2
      GROUP BY t.trip_id
      ORDER BY COUNT(st.stop_id) DESC
      LIMIT 1;
    `;
    // use stop list of longest trip
    const query2 = `
      SELECT DISTINCT ON (st.stop_sequence) st.stop_sequence, st.stop_id, s.stop_name
      FROM stop_times st
      JOIN stops s ON st.stop_id = s.stop_id
      WHERE st.trip_id = $1
      ORDER BY st.stop_sequence, st.stop_id;
    `;

    const response1 = await pool.query(query1, [routeId, directionId]);
    const tripId = response1.rows[0].trip_id;
    const response2 = await pool.query(query2, [tripId]);
    res.json(response2.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
