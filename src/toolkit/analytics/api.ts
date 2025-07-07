import { baseURL } from "../../config/axios"
import Cookies from "js-cookie";
const getAuthHeader = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};
const getAnalytics  = async () => {
    const response = baseURL.get(`/bookings/booking/analytics`, getAuthHeader())
    return (await response).data
}
export const analyticsApi = {
    getAnalytics
}