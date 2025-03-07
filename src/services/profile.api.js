const API_URL = import.meta.env.VITE_API_URL;

export const serviceProfile = {
  getProfileById: async () => {
    try {
      const response = await fetch(`${API_URL}/profiles/user-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const json = response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  updateProfileById: async (data) => {
    try {
      const response = await fetch(`${API_URL}/profiles`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};
