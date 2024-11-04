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
