const API_URL = import.meta.env.VITE_API_URL;

export const serviceOrder = {
  getUserOrder: async (params) => {
    const queryParams = new URLSearchParams();
    if (params.limit !== undefined && params.limit !== null)
      queryParams.append("limit", params.limit);
    if (params.offset !== undefined && params.offset !== null)
      queryParams.append("offset", params.offset);
    if (params.search !== undefined && params.search !== null)
      queryParams.append("search", params.search);
    try {
      const response = await fetch(
        `${API_URL}/transaction/user-orders?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const json = response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  getAllOrders: async (params) => {
    const queryParams = new URLSearchParams();
    if (params.limit !== undefined && params.limit !== null)
      queryParams.append("limit", params.limit);
    if (params.offset !== undefined && params.offset !== null)
      queryParams.append("offset", params.offset);
    if (params.search !== undefined && params.search !== null)
      queryParams.append("search", params.search);
    try {
      const response = await fetch(
        `${API_URL}/transaction/orders?${queryParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};
