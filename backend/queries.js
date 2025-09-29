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
    // find longest trip and use its stop list
    const query = `
      WITH longest_trip AS (
        SELECT t.trip_id
        FROM trips t
        JOIN stop_times st ON t.trip_id = st.trip_id
        WHERE t.route_id = $1 AND t.direction_id = $2
        GROUP BY t.trip_id
        ORDER BY COUNT(st.stop_id) DESC
        LIMIT 1
      )
      SELECT DISTINCT ON (st.stop_sequence)
        st.stop_sequence,
        st.stop_id,
        s.stop_name
      FROM stop_times st
      JOIN stops s ON st.stop_id = s.stop_id
      JOIN longest_trip lt ON st.trip_id = lt.trip_id
      ORDER BY st.stop_sequence, st.stop_id;
    `;

    const response = await pool.query(query, [routeId, directionId]);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
