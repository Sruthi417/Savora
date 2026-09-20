const getLocationFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          "User-Agent": "Savora Meal Planner",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location");
    }

    const data = await response.json();

    const address = data.address || {};

    return {
      country: address.country || null,
      state: address.state || null,
      city:
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        null,
    };
  } catch (error) {
    console.error("Location Error:", error.message);

    return {
      country: null,
      state: null,
      city: null,
    };
  }
};

export default getLocationFromCoordinates;