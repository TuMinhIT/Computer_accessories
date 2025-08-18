import axios from "./axiosConfig";

export const findOrCreateCustomer = async (data) => {
  const res = await axios.post("/customers/find-or-create", data);
  return res.data;
};

export const getCustomerOrders = async (customerId) => {
  const res = await axios.get(`/customers/${customerId}/orders`);
  return res.data;
};
