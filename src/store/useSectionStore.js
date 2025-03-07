import { serviceSection } from "@/services/section.api";
import { create } from "zustand";
import { useComponentStore } from "./useComponentStore";

export const useSectionStore = create((set, get) => ({
  sections: [],
  search: "",
  isLoading: null,
  status: null,
  limit: 10,
  offset: 0,
  totalRows: 0,
  formSection: {
    id: "",
    title: "",
    courseId: "",
    data: {},
    isActive: true,
    courseName: "",
  },
  setSearch: (search) => set({ search }),
  getAllSection: async () => {
    set({ isLoading: true });
    const { limit, offset, search } = get();
    const params = { limit, offset };
    if (search) params.search = search;
    try {
      const response = await serviceSection.getAllSection(params);
      set({
        sections: response.data,
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
  createSection: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceSection.createSection(data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllSection();
    } catch (error) {
      console.error(error.message);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  updateSectionById: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await serviceSection.updateSectionById(id, data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllSection();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteSectionById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await serviceSection.deleteSectionById(id);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllSection();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
