import axios, { AxiosError } from "axios";


interface UserType {
  email: string;
  username: string;
  password: string;
}
interface ApiResponse {
  success: boolean;
  message: string;
  data?: UserType;
}
const createUser = async (user: UserType): Promise<ApiResponse> => {
  try {
    const res = await axios.post<ApiResponse>("http://localhost:3120/api/users/register", user, {
    withCredentials:true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", res.data);
    return res.data; // اگه بخوای جواب رو برگردونی
  } catch (err) {
    const error = err as AxiosError;
    console.error("ERROR IN POST USER:", error.response?.data || error.message);
    throw error; // اگه بخوای error رو بیرون تابع هم هندل کنی
  }
};

export default createUser;
