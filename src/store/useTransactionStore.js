import { serviceMidtrans } from "@/services/midtrans.api";
import { serviceOrder } from "@/services/order.api";
import { create } from "zustand";
import { useComponentStore } from "./useComponentStore";

export const useTransactionStore = create((set, get) => ({
  token: null,
  transactions: [],
  orders: [],
  order: {},
  isLoading: null,
  status: null,
  search: "",
  limit: 10,
  offset: 0,
  totalRows: 0,
  setSearch: (search) => set({ search }),
  getAllOrders: async () => {
    set({ isLoading: true });
    const { limit, offset, search } = get();
    const params = { limit, offset };
    if (search) params.search = search;
    try {
      const response = await serviceOrder.getAllOrders(params);
      set({
        orders: response.data,
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
  getUserOrder: async () => {
    set({ isLoading: true });
    const { limit, offset, search } = get();
    const params = { limit, offset };
    if (search) params.search = search;
    try {
      const response = await serviceOrder.getUserOrder(params);
      set({
        response: response.data,
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
  getAllUserTransactions: async () => {
    set({ isLoading: true });
    const { limit, offset, search } = get();
    const params = { limit, offset };
    if (search) params.search = search;
    try {
      const response = await serviceMidtrans.getAllUserTransactions(params);
      set({
        transactions: response.data,
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
  createSnapTransaction: async () => {
    set({ isLoading: true });
    try {
      const response = await serviceMidtrans.createSnapTransaction();
      console.log(response);
      set({ token: response.data.token, status: response.status });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteSnapTransaction: async () => {
    set({ isLoading: true });
    try {
      const response = await serviceMidtrans.deleteSnapTransaction();
      set({ status: response.status });
      useComponentStore.setState({ message: response.message });
    } catch (error) {
      console.error(error.message);
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  checkSnapTransaction: async (orderId) => {
    set({ isLoading: true });
    try {
      const response = await serviceMidtrans.checkSnapTransaction(orderId);
      set({ status: response.status });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteCartIfCheckout: async () => {
    set({ isLoading: true });
    try {
      const response = await serviceMidtrans.deleteCartIfCheckout();
      set({ status: response.status });
      useComponentStore.setState({ message: response.message });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  cancelTransaction: async (orderId) => {
    set({ isLoading: true });
    try {
      const response = await serviceMidtrans.cancelTransaction(orderId);
      console.log(response);
      set({ status: response.status });
      useComponentStore.setState({ message: response.message });
    } catch (error) {
      console.error(error.message);
      useComponentStore.setState({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
