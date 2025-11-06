import React from "react";

const Footer = () => {
  return (
    <footer  style={{ backgroundColor: "oklch(0.34 0.07 261.22)" }}
  className="text-white mt-16">
      {/* Upper Footer */}
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">CuraFlix</h3>
          <p className="text-gray-300 leading-relaxed">
            CuraFlix is a WhatsApp-based healthcare platform that connects patients,
            doctors, and care with compassion and technology. We simplify healthcare
            and empower patients with clarity, connection, and confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-white transition">
                Register
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              📍 123 Health Street, Imphal, Manipur, India
            </li>
            <li>
              📞 +91 98765 43210
            </li>
            <li>
              ✉️ support@curaflix.com
            </li>
            <li>
              💬 Available on WhatsApp: +91 98765 43210
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-700"></div>

      {/* Bottom Footer */}
      <div className="text-center py-6 text-gray-300 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-white">CuraFlix</span>.  
        Empowering Patients with Dignity and Trust.
      </div>
    </footer>
  );
};

export default Footer;
