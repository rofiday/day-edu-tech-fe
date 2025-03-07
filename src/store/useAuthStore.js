import { create } from "zustand";
import { serviceAuth } from "../services/api";
import { useComponentStore } from "./useComponentStore";

export const useAuthStore = create((set) => ({
  users: [],
  token: null,
  isLoading: null,
  status: null,
  username: null,
  isAuthenticated: null,
  roleName: null,
  checkUserLogin: () => {
    if (localStorage.getItem("isAuthenticated")) {
      set({ isAuthenticated: true });
      set({ username: localStorage.getItem("username") });
      set({ roleName: localStorage.getItem("roleName") });
    }
  },
  register: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceAuth.register(data);
      set({
        users: response.data,
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceAuth.login(data);
      set({
        status: response.status,
        token: response.data,
      });
      useComponentStore.setState({ message: response.message });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  loginWithGoogle: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceAuth.loginWithGoogle(data);
      console.log(response);
      set({
        status: response.status,
        token: response.data,
      });
      useComponentStore.setState({ message: response.message });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      const response = await serviceAuth.logout();
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      localStorage.removeItem("roleName");
      set({
        status: response.status,
        isAuthenticated: false,
        username: null,
        roleName: null,
        token: null,
      });
      useComponentStore.setState({ message: response.message });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  forgotPassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceAuth.forgotPassword(data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  resetPassword: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceAuth.resetPassword(data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
