import { httpClient } from "./httpClient";
import { toast } from "react-toastify";

export const customerService = () => {
  const resource = "/customers";

  const findOrCreateCustomer = async (data) => {
    try {
      const res = await httpClient.post(`${resource}/find-or-create`, data);
      return res.data.data;
    } catch (error) {
      toast.error("Failed to create customer");
      throw error;
    }
  };

  const getCustomerOrders = async (customerId) => {
    try {
      const res = await httpClient.get(`${resource}/${customerId}/orders`);
      return res.data.data;
    } catch (error) {
      toast.error("Failed to fetch customer orders");
      throw error;
    }
  };

  return {
    findOrCreateCustomer,
    getCustomerOrders,
  };
};

export default customerService;
