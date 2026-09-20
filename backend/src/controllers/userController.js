import User from "../models/User.js";

// Get currently logged-in user
export const getUserProfile = async (req, res, next) => {
  try {
    // req.user is added by authMiddleware
    const user = await User.findById(req.user.userId).select(
      "name email image"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // If user has no Google image,
    // frontend can use the first letter of the name.
    const fallbackLetter = user.name
      ? user.name.charAt(0).toUpperCase()
      : "?";

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        image: user.image || null,
        fallbackLetter,
      },
    });
  } catch (error) {
    next(error);
  }
};