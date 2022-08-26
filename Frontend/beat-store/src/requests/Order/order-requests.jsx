import axiosBase from "../axios-base";

const OrderRequest = {
  GetClientSecret: async function GetClientSecret(queryData) {
    try {
      const response = await axiosBase.post("/orders", queryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  GetOrderAudioItems: async function GetOrderAudioItems(id) {
    try {
      const response = await axiosBase.get("/orders/" + id + "/audioitems");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default OrderRequest;
