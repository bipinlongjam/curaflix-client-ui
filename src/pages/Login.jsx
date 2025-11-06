import React from "react";

const Login = () => {
  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "oklch(0.34 0.07 261.22)" }}
        >
          Login
        </h2>
        <form>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[oklch(0.34_0.07_261.22)]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-[oklch(0.34_0.07_261.22)]"
          />
          <button
            className="text-white px-6 py-3 rounded-lg w-full transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "oklch(0.34 0.07 261.22)" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
