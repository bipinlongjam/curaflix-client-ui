import React from "react";

const Features = () => {
  const features = [
    {
      title: "WhatsApp-Based Care",
      desc: "Get medical support, reminders, and advice directly on WhatsApp — easy and secure.",
    },
    {
      title: "Personalized Guidance",
      desc: "Our MD doctors help interpret prescriptions and lab reports clearly and simply.",
    },
    {
      title: "Elderly Care Support",
      desc: "Stay connected with loved ones’ health — even from miles away.",
    },
    {
      title: "Real-Time Health Tracking",
      desc: "Receive timely medication reminders and health updates for better outcomes.",
    },
    {
      title: "Organized Health Records",
      desc: "All your reports and prescriptions safely stored with accessible EHR management.",
    },
    {
      title: "Empowering Knowledge",
      desc: "We explain every condition, treatment, and step — empowering you to heal confidently.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2
          className="text-3xl font-semibold mb-12"
          style={{ color: "oklch(0.34 0.07 261.22)" }}
        >
          Why Choose CuraFlix?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 shadow-lg rounded-2xl hover:shadow-2xl transition"
            >
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "oklch(0.34 0.07 261.22)" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
