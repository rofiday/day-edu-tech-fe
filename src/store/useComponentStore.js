import { create } from "zustand";

export const useComponentStore = create(() => ({
  isSideBarOpen: false,
  isModalOpen: false,
  isModalDeleteOpen: false,
  mode: "create",
  message: null,
  error: null,
}));
