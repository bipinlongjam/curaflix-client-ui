import React from "react";

const plans = [
  {
    id: "1m",
    label: "1 Month",
    price: 499,
    benefits: [
      "Access to medical history",
      "Basic health insights",
      "Email support",
    ],
  },
  {
    id: "6m",
    label: "6 Months",
    price: 2499,
    benefits: [
      "Full medical history access",
      "Priority health insights",
      "Free doctor Q&A (1 session)",
      "Email + chat support",
    ],
  },
  {
    id: "12m",
    label: "12 Months",
    price: 4999,
    benefits: [
      "Unlimited medical history access",
      "Advanced health insights",
      "Free doctor Q&A (3 sessions)",
      "Premium support",
      "Early access to new features",
    ],
  },
];

const SubscriptionPopup = ({ onClose, onChoose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-3xl p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Upgrade Your Subscription
        </h2>

        <p className="text-gray-600 mb-6 text-center">
          Unlock premium access to detailed medical records and personalized
          insights.
        </p>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer transition bg-gray-50 flex flex-col"
              style={{ minHeight: "320px" }} // ensures equal height
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">
                {p.label}
              </h3>

              <p className="text-center text-blue-600 font-bold text-xl mb-3">
                ₹{p.price}
              </p>

              {/* Benefits */}
              <ul className="text-sm text-gray-600 space-y-1 mb-4 flex-1">
                {p.benefits.map((b, idx) => (
                  <li key={idx}>• {b}</li>
                ))}
              </ul>

              <button
                onClick={() => onChoose(p)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition mt-auto"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="mt-5 w-full text-center text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPopup;
