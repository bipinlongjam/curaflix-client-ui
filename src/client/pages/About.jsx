import React from "react";

const About = () => {
  return (
    <div className="pt-24 px-6 container mx-auto max-w-5xl">
      <h2 className="text-4xl font-bold text-blue-600 mb-8">About Us</h2>
      <div className="text-gray-700 leading-relaxed space-y-5">
        <p>
          <strong>CuraFlix</strong> is a WhatsApp-based healthcare platform
          designed to make medical care simpler, smarter, and more human. We
          believe that true healing begins when patients understand their own
          health — and become active partners in decision-making and treatment
          planning.
        </p>

        <p>
          Our platform helps patients receive timely health reminders and stay
          connected with the right doctors and hospitals — all within the
          convenience of WhatsApp.
        </p>

        <p>
          Our mission is to empower patients through knowledge and connection.
          Whenever patients ask about their condition, our medical team explains
          it clearly — not just the diagnosis, but the “why,” “how,” and “what
          next.” We help them understand their diseases, medications, and
          lifestyle changes so they can take informed steps toward recovery and
          prevention.
        </p>

        <h3 className="text-2xl font-semibold text-blue-500 mt-6">
          CuraFlix integrates:
        </h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Pre-hospital mitigation to guide patients before emergencies occur.</li>
          <li>Matching the right disease to the right doctors and hospitals.</li>
          <li>Electronic Health Record (EHR) management for organized and accessible data.</li>
          <li>Real-time medication adherence and health reminders for consistent follow-up.</li>
          <li>MD doctors assisted personalized interpretation of prescriptions and lab reports.</li>
          <li>Elderly care coordination, especially for families living abroad.</li>
          <li>Solving daily health queries efficiently.</li>
        </ul>

        <p>
          Every patient interaction is handled through WhatsApp, phone call, or
          video call — combining convenience with personalized medical insight.
          Our goal is not just to treat illness but to build a culture of
          understanding, trust, and accountability between doctors and patients.
        </p>

        <p>
          What makes <strong>CuraFlix</strong> unique is our
          human-centered, technology-driven approach to compassionate healthcare
          delivery. Whether it’s managing chronic diseases, preventing
          emergencies, or simplifying doctor access, CuraFlix ensures that every
          step of care is efficient, accountable, and personalized.
        </p>

        <p>
          We envision a healthcare ecosystem where patients are informed,
          confident, and empowered with India’s most trusted digital health
          ecosystem — because knowledge is the most powerful medicine.
        </p>

        <p className="font-semibold text-blue-600">
          CuraFlix — Empowering Patients with dignity and trust, Elevating Care.
        </p>
      </div>
    </div>
  );
};

export default About;
