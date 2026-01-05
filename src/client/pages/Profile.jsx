
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PatientDetails from "../components/patient/PatientDetails";
import MedicalHistory from "../components/patient/MedicalHistory";
import useUpdateUser from "../hooks/useUpdateUser";
import useFetchUser from "../hooks/useFetchUser";
import SubscriptionPopup from "../components/subscription/SubscriptionPopup";
import useRazorpay from "../hooks/useRazorpay";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux user contains only ID + some fields
  const reduxUser = useSelector((state) => state.user.user);

  // For subscription & updated profile details
  const { userData, loading: userLoading, refetch } = useFetchUser(reduxUser?.id);

  const { updateUser, loading } = useUpdateUser();
  const { createOrder, verifyPayment } = useRazorpay();

  const [showSubscribePopup, setShowSubscribePopup] = useState(false);

  // Restore user to Redux after refresh
  useEffect(() => {
    const stored = localStorage.getItem("curaflix_user");
    if (!reduxUser && stored) {
      dispatch(
        setUser({
          user: JSON.parse(stored),
          token: localStorage.getItem("curaflix_token"),
        })
      );
    }

    if (!reduxUser && !stored) navigate("/login");
  }, [reduxUser, dispatch, navigate]);

  // -----------------------------
  // Update User Profile Handler
  // -----------------------------
  const handleSave = async (updatedData, selectedPhotoFile) => {
    const result = await updateUser(
      reduxUser.id,
      updatedData,
      selectedPhotoFile,
      reduxUser
    );

    if (result.success) {
      toast.success("Profile updated successfully!");
      refetch(); // refresh user details
    } else {
      toast.error("Update failed!");
    }
  };

  const handlePayment = async (planObj) => {
    const plan = planObj.id;
    const amount = planObj.price;

    try {
      const order = await createOrder(amount, plan);

      const options = {
        key: "rzp_test_RogUA3Tu9DTtMq",
        order_id: order.id,
        amount: order.amount,
        currency: "INR",
        name: "CuraFlix Subscription",
        description: `Subscription for ${planObj.label}`,

        handler: async function (response) {
          const verifyRes = await verifyPayment({
            userId: reduxUser.id,
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            amount,
            plan,
          });

          if (verifyRes.success) {
            toast.success("Subscription activated!");
            refetch(); 
            setShowSubscribePopup(false);
          }
        },

        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error("Payment failed!");
    }
  };

  // ---------------------------------------------
  // LOADING STATE UNTIL userData is fetched
  // ---------------------------------------------
  if (userLoading || !userData) {
    return (
      <div className="pt-24 text-center text-gray-600 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen ml-2 pt-2 bg-gray-50">
      {/* Profile Sidebar */}
      <PatientDetails user={reduxUser} onSave={handleSave} />

      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Medical Information</h2>

        {/* CHECK subscription from API — NOT Redux */}
        {userData.subscription ? (
          <MedicalHistory user={reduxUser}/>
        ) : (
          <div className="text-center mt-10 bg-white border rounded-lg p-10 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Unlock Full Medical Records
            </h3>

            <p className="text-gray-600 mb-6">
              Your medical insights, history tracking and premium health
              benefits are available only for subscribed users.
            </p>

            <button
              onClick={() => setShowSubscribePopup(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Subscribe Now
            </button>
          </div>
        )}
      </main>

      {showSubscribePopup && (
        <SubscriptionPopup
          onClose={() => setShowSubscribePopup(false)}
          onChoose={(plan) => handlePayment(plan)}
        />
      )}
    </div>
  );
};

export default Profile;
