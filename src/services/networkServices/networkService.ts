import axiosInstance from "./axios-instance";

export const getGroupsList = async () => {
  return await axiosInstance
    .get(`/group/get/all/admin`)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const deleteGroup = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/group/delete`, {
      params: { groupId: id },
    });
    return response.data;
  } catch (error) {
    console.log("Error deleting group:", error);
    throw error;
  }
};

type Body = {
  name: string;
  startDate: string;
  endDate: string;
  creatorId: number;
};

export const createGroup = async (body: Body) => {
  try {
    const response = await axiosInstance.post(`/group/create`, body);
    return response.data;
  } catch (error) {
    console.log("Error deleting group:", error);
    throw error;
  }
};

type UpdatingBody = {
  endDate: string;
  id: number;
  name: string;
  startDate: string;
};

export const updateGroup = async (body: UpdatingBody) => {
  try {
    const response = await axiosInstance.put(`/group/update`, body);
    return response.data;
  } catch (error) {
    console.log("Error deleting group:", error);
    throw error;
  }
};
