import { serviceProfile } from "@/services/profile.api";
import { create } from "zustand";
import { useComponentStore } from "./useComponentStore";

export const useProfileStore = create((set, get) => ({
  profile: {},
  isLoading: null,
  status: null,
  formProfile: {
    id: "",
    userId: "",
    bio: "",
    profileImage: "",
    address: "",
    gender: "",
    birthDate: null,
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
    readerUrl: null,
  },
  getProfileById: async () => {
    set({ isLoading: true });
    try {
      const response = await serviceProfile.getProfileById();
      set({
        profile: response.data,
        status: response.status,
        formProfile: response.data,
      });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  updateProfileById: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceProfile.updateProfileById(data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getProfileById();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
