import React from "react";
import docPhotos from "../assets/docPhotos.jpg";
import Features from "../components/Features";
import Mission from "../components/Mission";
import "../styles/Home.css"; // External CSS file

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${docPhotos})` }}
      >
        <div className="overlay"></div>

        {/* Hero Content — moved visually to the bottom */}
        <div className="hero-content">
          <h1 className="hero-title">
            Smarter Healthcare. Simplified on WhatsApp.
          </h1>
          <p className="hero-subtext">
            CuraFlix connects patients, doctors, and care — all within the
            comfort of WhatsApp.
          </p>
          <button className="hero-button">Get Started with CuraFlix</button>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Mission Section */}
      <Mission />
    </div>
  );
};

export default Home;
