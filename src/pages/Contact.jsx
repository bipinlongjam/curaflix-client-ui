import React from "react";

const Contact = () => {
  return (
    <div className="pt-24 px-6 container mx-auto">
      <h2 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h2>
      <form className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-2xl">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-3 rounded mb-4"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-3 rounded mb-4"
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full border p-3 rounded mb-4"
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
