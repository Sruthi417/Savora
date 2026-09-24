import api from "./axios";

// Redirect the browser to Google's OAuth consent screen.
// This must be a real page navigation (not an axios call) since
// the backend responds with an HTTP redirect to Google.
//
// `redirectPrompt` (optional) is round-tripped through Google's
// `state` param and restored as `?prompt=` on /planner once the
// user is back, so text typed before logging in isn't lost.
export const loginWithGoogle = (redirectPrompt) => {
  const params = new URLSearchParams();

  if (redirectPrompt) {
    params.set("state", redirectPrompt);
  }

  const query = params.toString();

  // Not an internal Next.js route — this hits the Express backend
  // directly, which responds with a redirect to Google.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google${
    query ? `?${query}` : ""
  }`;
};

// Logout current user
export const logoutUser = () => {
  return api.post("/auth/logout");
};
