import React from "react";

const Mission = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2
          className="text-3xl font-semibold mb-6"
          style={{ color: "oklch(0.34 0.07 261.22)" }}
        >
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed">
          At <strong>CuraFlix</strong>, our mission is to empower patients
          through knowledge, connection, and care. We believe healthcare should
          be accessible, compassionate, and human — not complicated. Whether you
          need guidance before emergencies, help managing chronic conditions, or
          simply want clarity about your health, CuraFlix is here to simplify
          your journey toward better well-being.
        </p>
        <p
          className="font-semibold mt-6"
          style={{ color: "oklch(0.34 0.07 261.22)" }}
        >
          CuraFlix — Empowering Patients with Dignity and Trust, Elevating Care.
        </p>
      </div>
    </section>
  );
};

export default Mission;
