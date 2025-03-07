const API_URL = import.meta.env.VITE_API_URL;
import { serviceAuth } from "./api";
import { encryptPayload } from "./forge";
export const serviceCourse = {
  getUserCourses: async () => {
    try {
      const response = await fetch(`${API_URL}/courses/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
  getAllCourse: async (params) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.limit !== undefined && params.limit !== null)
        queryParams.append("limit", params.limit);
      if (params.offset !== undefined && params.offset !== null)
        queryParams.append("offset", params.offset);
      if (params.search !== undefined && params.search !== null)
        queryParams.append("search", params.search);
      const response = await fetch(
        `${API_URL}/courses?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
  getCourseByIdLms: async (id) => {
    try {
      console.log(id);
      const response = await fetch(`${API_URL}/courses/lms/${id}`, {
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
  getCourseByIdPublic: async (id) => {
    try {
      const response = await fetch(`${API_URL}/courses/public/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("PUBLIC", id);
      const json = await response.json();
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  getCourseByIdProtected: async (id) => {
    try {
      const response = await fetch(`${API_URL}/courses/protected/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
  createCourse: async (data) => {
    try {
      const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
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
  updateCourseById: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/courses/${id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
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
  updateUserCart: async () => {
    try {
      const response = await fetch(`${API_URL}/courses/carts`, {
        method: "PUT",
        credentials: "include",
      });
      const json = await response.json();
      console.log(json, "test");
      if (json.status === "error") throw new Error(json.message);
      return json;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  deleteCourseById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/courses/${id}`, {
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

  getAllCourseFromCart: async () => {
    try {
      const response = await fetch(`${API_URL}/courses/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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

  addCourseToCart: async (id) => {
    try {
      const session = await serviceAuth.generateSessionKey();
      const response = await fetch(`${API_URL}/courses/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          encryptPayload({ courseId: id }, session.__unknown_session)
        ),
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

  deleteCourseFromCart: async (id) => {
    try {
      const session = await serviceAuth.generateSessionKey();
      const response = await fetch(`${API_URL}/courses/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          encryptPayload({ courseId: id }, session.__unknown_session)
        ),
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
