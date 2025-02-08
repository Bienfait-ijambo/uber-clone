/**
 * Calculates the distance between two coordinates using the Haversine formula.
 *
 * @param {number} lat1 Latitude of point 1 in decimal degrees.
 * @param {number} lon1 Longitude of point 1 in decimal degrees.
 * @param {number} lat2 Latitude of point 2 in decimal degrees.
 * @param {number} lon2 Longitude of point 2 in decimal degrees.
 * @return {number} Distance in kilometers.
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Earth radius in kilometers
  
    // Convert degrees to radians
    const toRad = angle => (angle * Math.PI) / 180;
    const latFrom = toRad(lat1);
    const lonFrom = toRad(lon1);
    const latTo   = toRad(lat2);
    const lonTo   = toRad(lon2);
  
    const latDelta = latTo - latFrom;
    const lonDelta = lonTo - lonFrom;
  
    const a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
              Math.cos(latFrom) * Math.cos(latTo) *
              Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return earthRadius * c;
  }
  
  /**
   * Finds the nearest driver given the client coordinate and a list of drivers.
   *
   * @param {Object} client An object with 'location_latitude' and 'location_longitude' properties.
   * @param {Array} drivers An array of objects each containing 'user_id', 'user_name', 'location_latitude', 'location_longitude', and 'status'.
   * @return {Object|null} Returns an object with 'user_id', 'user_name', and 'distance' (in km), or null if no driver is found.
   */
  export function getNearestDriver(client, drivers) {
    // Convert client coordinates to floats
    const clientLat = parseFloat(client.location_latitude);
    const clientLon = parseFloat(client.location_longitude);
    
    let nearestDriver = null;
    let shortestDistance = Infinity;
    
    drivers.forEach(driver => {
      // Only consider available drivers (status == 1)
      if (driver.status === 1) {
        const driverLat = parseFloat(driver.location_latitude);
        const driverLon = parseFloat(driver.location_longitude);
        
        const distance = haversineDistance(clientLat, clientLon, driverLat, driverLon);
        
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestDriver = {
            user_id: driver.user_id,
            user_name: driver.user_name,
            distance: distance
          };
        }
      }
    });
    
    return nearestDriver;
  }
  
  // Example usage:
  
  // Client coordinates (example client)
  const clientCoordinates = {
    id: 2,
    location_address: "Santa Maria, California, United States",
    location_latitude: "34.95307000",
    location_longitude: "-120.43597000",
    destination_address: "Montecito Park, Glendale, California, United States",
    destination_latitude: "34.20261800",
    destination_longitude: "-118.22693000"
  };
  
  // Driver coordinates (example drivers)
  const driverCoordinates = [
    {
      user_id: 8,
      user_name: "Alice",
      location_address: "Goleta, California, United States",
      location_latitude: "34.43601200",
      location_longitude: "-119.82932000",
      status: 1
    },
    {
      user_id: 10,
      user_name: "Josh",
      location_address: "Bakersfield, California, United States",
      location_latitude: "35.37433600",
      location_longitude: "-119.01893000",
      status: 1
    }
  ];
  
  const nearestDriver = getNearestDriver(clientCoordinates, driverCoordinates);
  
  if (nearestDriver) {
    console.log(`The nearest driver is: ${nearestDriver.user_name} (ID: ${nearestDriver.user_id}) at a distance of ${nearestDriver.distance.toFixed(2)} km.`);
  } else {
    console.log("No available driver found.");
  }
  