import axios from "../../utils/axiosConfig";

const useRazorpay = () => {
  const createOrder = async (amount, plan) => {
    const token = localStorage.getItem("curaflix_token");

    const res = await axios.post(
      "/api/payment/create-order",
      { amount, plan },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return res.data.order;
  };

  const verifyPayment = async (details) => {
    const token = localStorage.getItem("curaflix_token");

    const res = await axios.post(
      "/api/payment/verify-payment",
      details,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return res.data;
  };

  return { createOrder, verifyPayment };
};

export default useRazorpay;
