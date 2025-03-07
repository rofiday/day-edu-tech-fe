import { serviceAuth } from "./api";
import { encryptPayload } from "./forge";

const API_URL = import.meta.env.VITE_API_URL;
export const serviceCurriculum = {
  getAllCurriculum: async (params) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.limit !== undefined && params.limit !== null)
        queryParams.append("limit", params.limit);
      if (params.offset !== undefined && params.offset !== null)
        queryParams.append("offset", params.offset);
      if (params.search !== undefined && params.search !== null)
        queryParams.append("search", params.search);
      const response = await fetch(
        `${API_URL}/curriculums?${queryParams.toString()}`,
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
  createCurriculum: async (data) => {
    try {
      console.log(data);
      const session = await serviceAuth.generateSessionKey();
      const response = await fetch(`${API_URL}/curriculums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encryptPayload(data, session.__unknown_session)),
        credentials: "include",
      });
      const json = await response.json();
      console.log(json);
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  updateCurriculumById: async (id, data) => {
    try {
      const session = await serviceAuth.generateSessionKey();
      const response = await fetch(`${API_URL}/curriculums/${id}`, {
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
  deleteCurriculumById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/curriculums/${id}`, {
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
