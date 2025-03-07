import { create } from "zustand";
import { serviceUser } from "../services/user.api";
import { useComponentStore } from "./useComponentStore";
export const useUserStore = create((set, get) => ({
  users: [],
  isLoading: null,
  status: null,
  search: "",
  limit: 10,
  offset: 0,
  totalRows: 0,
  formUser: {
    id: "",
    fullname: "",
    username: "",
    email: "",
    phoneNumber: "",
    roleName: "Student",
  },
  setSearch: (search) => set({ search }),
  getAllUser: async () => {
    set({ isLoading: true });
    const { limit, offset, search } = get();
    const params = { limit, offset };
    if (search) params.search = search;
    try {
      const response = await serviceUser.getAllUser(params);
      set({
        users: response.data,
        status: response.status,
        totalRows: response.count,
      });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  createUser: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceUser.createUser(data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllUser();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  updateUserById: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await serviceUser.updateUserById(id, data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllUser();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteUserById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await serviceUser.deleteUserById(id);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllUser();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
