const API_URL = import.meta.env.VITE_API_URL;
import { encryptPayload } from "./forge";

export const serviceAuth = {
  generateSessionKey: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/session`, {
        method: "GET",
      });
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  register: async (data) => {
    try {
      const session = await serviceAuth.generateSessionKey();
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encryptPayload(data, session.__unknown_session)),
      });
      console.log(response);
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  login: async (data) => {
    try {
      const session = await serviceAuth.generateSessionKey();
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // yang ngepost ditambahkan ini
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
  loginWithGoogle: async (data) => {
    try {
      const response = await fetch(`${API_URL}/auth/continue-with-google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
  logout: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
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
  forgotPassword: async (data) => {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  resetPassword: async (data) => {
    try {
      const response = await fetch(
        `${API_URL}/auth/reset-password?token=${data.token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
