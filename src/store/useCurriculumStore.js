import { serviceCurriculum } from "@/services/curriculum.api";
import { create } from "zustand";
import { useComponentStore } from "./useComponentStore";

export const useCurriculumStore = create((set, get) => ({
  curriculums: [],
  isLoading: null,
  status: null,
  search: "",
  limit: 10,
  offset: 0,
  totalRows: 0,
  formCurriculum: {
    id: "",
    title: "",
    sectionId: "",
    sectionTitle: "",
    contents: "",
    data: "{}",
    isActive: true,
  },
  setSearch: (search) => set({ search }),
  getAllCurriculum: async () => {
    set({ isLoading: true });
    const { limit, offset, search } = get();
    const params = { limit, offset };
    if (search) params.search = search;
    try {
      const response = await serviceCurriculum.getAllCurriculum(params);
      set({
        curriculums: response.data,
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
  createCurriculum: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceCurriculum.createCurriculum(data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllCurriculum();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  updateCurriculumById: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await serviceCurriculum.updateCurriculumById(id, data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllCurriculum();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteCurriculumById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await serviceCurriculum.deleteCurriculumById(id);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllCurriculum();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
