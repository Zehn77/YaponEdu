import axios from "axios";

export const login = async ({
  phoneNumber,
  password,
}: {
  phoneNumber: string;
  password: string;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_API_KEY}/auth/login/web`,
    { phoneNumber: "+998" + phoneNumber, password },
    {
      headers: {
        "web-request": "true",
      },
    }
  );
  return response.data;
};
