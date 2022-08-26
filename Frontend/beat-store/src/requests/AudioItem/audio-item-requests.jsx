import axiosBase from "../axios-base";

const AudioItemRequest = {
  getAll: async function GetAllAudioItems(queryParams) {
    try {
      const response = await axiosBase.get("/audioitems", {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getMinMaxBpm: async function GetMinMaxBpm() {
    try {
      const response = await axiosBase.get("/audioitems/minmaxbpm");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getMinMaxPrice: async function GetMinMaxPrice() {
    try {
      const response = await axiosBase.get("/audioitems/minmaxprice");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAudioUrl: async function GetAudioUrl(id) {
    try {
      const response = await axiosBase.get("/audioitems/" + id + "/audiourl");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteAudioItem: async function DeleteAudioItemById(id) {
    try {
      console.log(axiosBase.defaults.headers);
      const response = await axiosBase.delete("/audioitems/" + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addAudioItem: async function AddAudioItem(itemData) {
    try {
      const response = await axiosBase.post("/audioitems", itemData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  putAudioItem: async function PutAudioItem(id, itemData) {
    try {
      const response = await axiosBase.put("/audioitems/" + id, itemData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { AudioItemRequest };
