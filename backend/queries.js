import express from "express";
import pool from "./db.js";

const router = express.Router();

router.get("/routes", async (req, res) => {
  try {
    const query = `
      SELECT route_id, route_short_name, route_long_name FROM routes
    `;
    const response = await pool.query(query);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
