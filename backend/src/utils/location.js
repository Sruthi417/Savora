export const validateLocation = (latitude, longitude) => {
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return false;
  }

  if (latitude < -90 || latitude > 90) {
    return false;
  }

  if (longitude < -180 || longitude > 180) {
    return false;
  }

  return true;
};