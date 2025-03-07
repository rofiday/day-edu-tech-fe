import { serviceCourse } from "@/services/course.api";
import { create } from "zustand";
import { useComponentStore } from "./useComponentStore";

export const useCourseStore = create((set, get) => ({
  carts: [],
  myCourses: [],
  courses: [],
  course: {},
  isLoading: null,
  status: null,
  search: "",
  limit: 10,
  offset: 0,
  totalRows: 0,
  formCourse: {
    id: "",
    name: "",
    code: "",
    description: "",
    data: {},
    type: "",
    price: 0,
    image: "",
    isActive: true,
  },
  readerUrl: null,
  selectedCourse: [],
  isNotFound: false,
  isAvailableCourse: true,
  setSearch: (search) => set({ search }),
  deleteCourseFromCart: async (id) => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.deleteCourseFromCart(id);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllCourseFromCart();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getAllCourseFromCart: async () => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.getAllCourseFromCart();
      set({
        carts: response.data.courses,
        status: response.status,
      });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  addCourseToCart: async (id) => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.addCourseToCart(id);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllCourseFromCart();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getUserCourses: async () => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.getUserCourses();
      set({
        myCourses: response.data,
        status: response.status,
      });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getAllCourse: async () => {
    set({ isLoading: true });
    const { limit, offset, search } = get();
    const params = { limit, offset };
    if (search) params.search = search;
    try {
      const response = await serviceCourse.getAllCourse(params);
      console.log(response);
      set({
        courses: response.data,
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
  getCourseByIdLms: async (id) => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.getCourseByIdLms(id);
      if (response.status === "error") {
        set({ isNotFound: true });
      } else {
        set({
          isNotFound: false,
          course: response.data,
          status: response.status,
        });
      }
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getCourseByIdPublic: async (id) => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.getCourseByIdPublic(id);
      set({
        course: response.data,
        status: response.status,
        isAvailableCourse: response.data.isAvailableCourse,
      });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getCourseByIdProtected: async (id) => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.getCourseByIdProtected(id);
      set({
        course: response.data,
        status: response.status,
        isAvailableCourse: response.data.isAvailableCourse,
      });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  createCourse: async (data) => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.createCourse(data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllCourse();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  updateCourseById: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.updateCourseById(id, data);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllCourse();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteCourseById: async (id) => {
    set({ isLoading: true });
    try {
      console.log(id, "store");
      const response = await serviceCourse.deleteCourseById(id);
      set({
        status: response.status,
      });
      useComponentStore.setState({ message: response.message });
      await get().getAllCourse();
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  updateUserCart: async () => {
    set({ isLoading: true });
    try {
      const response = await serviceCourse.updateUserCart();
      console.log(response);
      if (response?.isUpdatingCart === true) {
        set({ carts: [] });
        location.href = "/orders";
      }
      set({
        status: response.status,
      });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  // clearCart: () => {
  //   set({ carts: [] });
  // },
}));
