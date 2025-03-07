const API_URL = import.meta.env.VITE_API_URL;

export const serviceMidtrans = {
  getAllUserTransactions: async (params) => {
    try {
      console.log("params", params);
      const queryParams = new URLSearchParams();
      if (params.limit !== undefined && params.limit !== null)
        queryParams.append("limit", params.limit);
      if (params.offset !== undefined && params.offset !== null)
        queryParams.append("offset", params.offset);
      if (params.search !== undefined && params.search !== null)
        queryParams.append("search", params.search);
      console.log(queryParams, "test");
      const response = await fetch(
        `${API_URL}/transaction?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  createSnapTransaction: async () => {
    try {
      const response = await fetch(`${API_URL}/transaction/snap-transaction`, {
        method: "POST",
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
  deleteSnapTransaction: async () => {
    try {
      console.log("DELETE");
      console.log();
      const response = await fetch(
        `${API_URL}/transaction/cancel-snap-transaction`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  checkSnapTransaction: async (orderId) => {
    try {
      const response = await fetch(
        `${API_URL}/transaction/check-snap-transaction/${orderId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      if (json === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  deleteCartIfCheckout: async () => {
    try {
      const response = await fetch(`${API_URL}/transaction/delete-cart`, {
        method: "DELETE",
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
  cancelTransaction: async (orderId) => {
    try {
      const response = await fetch(
        `${API_URL}/transaction/cancel-order/${orderId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};
