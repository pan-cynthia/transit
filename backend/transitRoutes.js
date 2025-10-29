import axios from "axios";
import express from "express";

const app = express.Router();

app.get("/stop/:stopId", async (req, res) => {
  const { stopId } = req.params;
  const { routeId } = req.query; // optional filter

  try {
    const response = await axios.get(
      "https://api.511.org/transit/stopMonitoring",
      {
        params: {
          api_key: process.env.TRANSIT_API_KEY,
          agency: "SF",
          stopCode: stopId
        }
      }
    );

    const visits =
      response.data.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit;

    const arrivals = visits.map(visit => {
      const journey = visit.MonitoredVehicleJourney;
      return {
        line: journey.LineRef,
        name: journey.PublishedLineName,
        origin: journey.OriginName,
        destination: journey.DestinationName,
        time: journey.MonitoredCall.ExpectedArrivalTime,
        direction: journey.DirectionRef === "IB" ? 1 : 0,
        vehicleLocation: journey.VehicleLocation
      };
    });

    const validArrivals = arrivals.filter(arrival => arrival.time !== null);

    // if routeId is provided, only display predictions for selected route at stop
    // otherwise, display all predictions for all routes at stop
    const filteredArrivals = routeId
      ? validArrivals.filter(arrival => arrival.line === routeId)
      : validArrivals;

    const groups = filteredArrivals.reduce((accumulator, arrival) => {
      const line = arrival.line;
      if (!accumulator[line]) {
        accumulator[line] = []; // create new group
      }
      accumulator[line].push(arrival);
      return accumulator;
    }, {});

    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to fetch stop monitoring" });
  }
});

export default app;
