import cors from "cors";
import express from "express";
import router from "./queries.js";
import transitRoutes from "./transitRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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
