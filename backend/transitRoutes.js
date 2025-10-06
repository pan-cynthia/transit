import axios from "axios";
import express from "express";
import { haversineDistance } from "./distance.js";

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

app.get("/stop/:stopId", async (req, res) => {
  const { stopId } = req.params;
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
        destination: journey.DestinationName,
        time: journey.MonitoredCall.ExpectedArrivalTime
      };
    });

    const groups = arrivals.reduce((accumulator, arrival) => {
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

app.get("/lines", async (req, res) => {
  try {
    const response = await axios.get("https://api.511.org/transit/lines", {
      params: {
        api_key: process.env.TRANSIT_API_KEY,
        operator_id: "SF"
      }
    });

    const lines = response.data.map(line => {
      return {
        id: line.Id,
        name: line.Name
      };
    });

    // check if id contains only letters
    const isLettersOnly = id => /^[A-Z]+$/.test(id);

    // letter only ids come before mixed number ids
    const sortedLines = lines.sort((a, b) => {
      const aLetters = isLettersOnly(a.id);
      const bLetters = isLettersOnly(b.id);

      // check if one id is letters only and the other one isn't
      if (aLetters != bLetters) {
        // both letters/numbers only
        if (aLetters == true) {
          // a is letters only, b is not
          return -1; // a comes before b
        }
        return 1; // b comes before a
      }

      // within each group sort naturally
      return a.id.localeCompare(b.id, undefined, {
        numeric: true,
        sensitivity: "base"
      });
    });

    res.json(sortedLines);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to fetch lines" });
  }
});

// returns direction name associated with specific line
app.get("/patterns/:lineId", async (req, res) => {
  const { lineId } = req.params;
  const response = await axios.get("https://api.511.org/transit/patterns", {
    params: {
      api_key: process.env.TRANSIT_API_KEY,
      operator_id: "SF",
      line_id: lineId
    }
  });

  const patterns = response.data.journeyPatterns;

  const inbound = patterns
    .filter(pattern => pattern.DirectionRef === "IB")
    .map(pattern => pattern.Name)
    .filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

  const outbound = patterns
    .filter(pattern => pattern.DirectionRef === "OB")
    .map(pattern => pattern.Name)
    .filter((item, index, self) => {
      return self.indexOf(item) === index;
    });

  res.json(
    [...inbound, ...outbound].map(name => ({
      name: name
    }))
  );
});

export default app;
