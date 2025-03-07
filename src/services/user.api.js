const API_URL = import.meta.env.VITE_API_URL;
import { serviceAuth } from "./api";
import { encryptPayload } from "./forge";

export const serviceUser = {
  getAllUser: async (params) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.limit !== undefined && params.limit !== null)
        queryParams.append("limit", params.limit);
      if (params.offset !== undefined && params.offset !== null)
        queryParams.append("offset", params.offset);
      if (params.search !== undefined && params.search !== null)
        queryParams.append("search", params.search);
      const response = await fetch(
        `${API_URL}/users?${queryParams.toString()}`,
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
  createUser: async (data) => {
    try {
      const session = await serviceAuth.generateSessionKey();
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encryptPayload(data, session.__unknown_session)),
        credentials: "include",
      });
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  updateUserById: async (id, data) => {
    try {
      const session = await serviceAuth.generateSessionKey();
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encryptPayload(data, session.__unknown_session)),
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
  deleteUserById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
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
