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

export default router;
