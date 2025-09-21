// computes distance between two points given their latitude and longitudes
export const haversineDistance = (lat1, long1, lat2, long2) => {
  // d = 2R * arcsin(sqrt(sin^2(lat2-lat1) + cos(lat1) * cos(lat2) * sin^2(long2-long1)/2))

  // converts value from degrees to radians
  const toRad = x => (x * Math.PI) / 180;

  const R = 3963.2; // approx radius of earth in miles

  const dLat = toRad(lat2 - lat1);
  const dLong = toRad(long2 - long1);

  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLong / 2), 2) *
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2));
  const c = 2 * Math.asin(Math.sqrt(a));

  return R * c;
};
