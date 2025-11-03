import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./queries.js";
import transitRoutes from "./transitRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use("/api", transitRoutes); // 511 API
app.use("/api", router); // db queries

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

export default app;
