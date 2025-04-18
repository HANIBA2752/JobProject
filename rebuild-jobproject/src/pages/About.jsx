import React from "react";
import "../components/About/About.css";
import "animate.css";
import logo from "../assets/Logo.png";
import jai from "../assets/jai.jpg";
import bell from "../assets/bell.jpg";
import earth from "../assets/earth.jpg";
import TeamCard from "../components/About/TeamCard";
import { FaUsers, FaLaptopCode, FaGraduationCap } from "react-icons/fa";

function About() {
  const features = [
    {
      icon: <FaLaptopCode className="w-10 h-10 text-blue-500" />,
      title: "Career Insights",
      description:
        "Detailed information on various computer engineering roles and responsibilities.",
    },
    {
      icon: <FaGraduationCap className="w-10 h-10 text-green-500" />,
      title: "For Graduates",
      description:
        "Tailored resources to help recent graduates navigate their first career steps.",
    },
    {
      icon: <FaUsers className="w-10 h-10 text-purple-500" />,
      title: "Industry Trends",
      description:
        "Up-to-date information on high-demand professions in the tech industry.",
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section with Parallax Effect */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title animate__animated animate__fadeIn">
            ABOUT US
          </h1>
          <p className="hero-subtitle animate__animated animate__fadeIn animate__delay-1s">
            Helping you explore your career possibilities
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-content">
          <div className="mission-image animate__animated animate__fadeInLeft">
            <img src={logo} alt="Job Explore Logo" />
          </div>
          <div className="mission-text animate__animated animate__fadeInRight">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-description">
              JOB Explore is designed to empower recent graduates and anyone
              interested in computer engineering careers. We provide
              comprehensive insights into available job roles, responsibilities,
              and required skills, while highlighting which professions are
              currently in high demand in the industry.
            </p>

            {/* Feature Cards */}
            <div className="feature-cards">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2 className="team-title animate__animated animate__fadeInUp">
          Meet Our Team
        </h2>
        <div className="team-description">
          <p>The passionate individuals behind JOB Explore</p>
        </div>

        <div className="team-grid">
          <div className="team-card-wrapper animate__animated animate__fadeInUp animate__delay-1s">
            <TeamCard
              image={jai}
              name="Kritsadagorn Punnapanich"
              description="Frontend Developer"
              facebook="https://www.facebook.com/kritsadagorn"
              instagram="https://www.instagram.com/k.kritx_/"
              github="https://github.com/kritsadagorn"
              email="catsamotyba@gmail.com"
            />
          </div>

          <div className="team-card-wrapper animate__animated animate__fadeInUp animate__delay-2s">
            <TeamCard
              image={bell}
              name="Theeraphat Gunthong"
              description="UI/UX Designer"
              facebook="https://www.facebook.com/theeraphat.gunthong"
              instagram="https://www.instagram.com/perish_sunflower/"
              github="https://github.com/TheerapatGunthog"
              email="Bellbelieve.work@gmail.com"
            />
          </div>

          <div className="team-card-wrapper animate__animated animate__fadeInUp animate__delay-3s">
            <TeamCard
              image={earth}
              name="Wuttipat Srikham"
              description="Backend Developer"
              facebook="https://www.facebook.com/profile.php?id=100002190974853"
              instagram="https://www.instagram.com/earth.wut_ti/"
              github="https://github.com/michaellee"
              email="wuttipat2004@gmail.com"
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="testimonial-section">
        <div className="testimonial-container">
          <h2 className="testimonial-title">WHAT WE DO?</h2>
          <div className="testimonial-card">
            <div className="testimonial-quote">
              "PositionExplorer helps you learn about different roles across various
              career fields, so you can understand how each job works and access
              detailed information about the positions you're interested in"
            </div>
            <div className="testimonial-author">positionExplorer</div>
          </div>
        </div>
      </div>

      {/* Thank You Section */}
      <div className="thank-you-section">
        <h2 className="thank-you-text animate__animated animate__pulse animate__infinite">
          Thank You For Visiting Our Site!
        </h2>
        <p className="contact-prompt">
          {/* Have questions? Feel free to reach out to our team. */}
        </p>
      </div>
    </div>
  );
}

export default About;
