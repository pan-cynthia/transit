// some routes have trip variants, handle these cases manually

export const directionOverrides = {
  L: [
    { direction_id: 0, trip_headsign: "S.F. Zoo" },
    { direction_id: 1, trip_headsign: "Third St & 23rd St" }
  ],
  24: [
    { direction_id: 1, trip_headsign: "Jackson + Fillmore" },
    { direction_id: 0, trip_headsign: "Palou + Third Street" },
    { direction_id: 1.1, trip_headsign: "Sutter Street" }
  ],
  25: [
    { direction_id: 1, trip_headsign: "Transit Center" },
    {
      direction_id: 0,
      trip_headsign: "Treasure Island from Transit Center Bay 29"
    },
    {
      direction_id: 0,
      trip_headsign: "Treasure Island from Transit Center Bay E"
    }
  ],
  29: [
    { direction_id: 1, trip_headsign: "25th & California" },
    { direction_id: 0, trip_headsign: "Paul + Third Street" }
  ],
  30: [
    { direction_id: 0, trip_headsign: "Broderick St" },
    { direction_id: 1.1, trip_headsign: "Caltrain Depot" }
  ],
  "30X": [{ direction_id: 1, trip_headsign: "Spear + Howard" }],
  38: [
    { direction_id: 0, trip_headsign: "Lands End - 48th Avenue" },
    {
      direction_id: 1,
      trip_headsign: "Transit Center from 48th Ave & Point Lobos Ave"
    },
    { direction_id: 1.1, trip_headsign: "Transit Center from V.A. Hospital" }
  ],
  56: [
    { direction_id: 0, trip_headsign: "Arleta + Bayshore" },
    { direction_id: 1, trip_headsign: "Visitacion Valley Middle School" }
  ]
};
