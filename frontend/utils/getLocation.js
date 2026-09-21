export const getUserLocation = () => {
  return new Promise((resolve) => {
    // Check if browser supports geolocation
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log("Location permission denied:", error.message);

        // User can still use Savora without location
        resolve(null);
      }
    );
  });
};