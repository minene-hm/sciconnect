import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Home.css";
import { useInView } from "../../hooks/useInView"; 
import { FaBrain, FaChartBar, FaShieldAlt, FaRobot, FaCloud, FaAtom } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import heroBg from "../../assets/hero.png";
import speakerImg from "../../assets/speaker.jpg";
import audienceImg from "../../assets/audience.jpg";
import ellipseBg from "../../assets/ellipse.png";
import Img1 from "../../assets/download (62).jpeg";
import heroVideo from "../../assets/hero-video.mp4";

import sp1 from "../../assets/sp1.png";
import sp2 from "../../assets/sp2.png";
import sp3 from "../../assets/sp3.png";
import sp4 from "../../assets/sp4.png";
import sp5 from "../../assets/sp5.png";
import sp6 from "../../assets/sp6.png";
import sp7 from "../../assets/sp7.png";
import sp8 from "../../assets/sp8.png";
import sp9 from "../../assets/sp9.png";
import sp10 from "../../assets/sp10.png";
import sp11 from "../../assets/sp11.png";
import sp12 from "../../assets/sp12.png";

import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const targetDate = new Date("September 30, 2026 00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => String(num).padStart(2, "0");
  const speakersData = {
    1: [
      { img: sp1, name: "Azro Malek", time: "9:00 AM - 10:30 AM", title: "Presentation and Keynotes", desc: "Exploring the future of AI in creative industries." },
      { img: sp2, name: "Khadidja Minasseri", time: "11:00 AM - 12:30 PM", title: "Machine Learning Workshop", desc: "Hands-on session with the latest ML tools." },
      { img: sp3, name: "Feganou Mohamed", time: "2:00 PM - 3:30 PM", title: "Ethics in AI", desc: "Navigating the moral landscape of artificial intelligence." },
    ],
    2: [
      { img: sp4, name: "Touati Abdellah", time: "9:00 AM - 10:30 AM", title: "Quantum Computing", desc: "The next frontier in processing power." },
      { img: sp5, name: "Sonia Brawni", time: "11:00 AM - 12:30 PM", title: "AI in Healthcare", desc: "Transforming patient care with predictive models." },
      { img: sp6, name: "Bendjabo Salah", time: "2:00 PM - 3:30 PM", title: "Neural Networks Deep Dive", desc: "Understanding the architecture behind modern AI." },
    ],
    3: [
      { img: sp7, name: "Zitouni Fatiha", time: "9:00 AM - 10:30 AM", title: "Computer Vision", desc: "Applications in autonomous systems." },
      { img: sp8, name: "Kharoubi Amel", time: "11:00 AM - 12:30 PM", title: "NLP Advancements", desc: "From transformers to large language models." },
      { img: sp9, name: "Fatma-Zohra Aliani", time: "2:00 PM - 3:30 PM", title: "Robotics & AI", desc: "Integrating intelligence into physical machines." },
    ],
    4: [
      { img: sp10, name: "Wafi Ahmed", time: "9:00 AM - 10:30 AM", title: "AI in Finance", desc: "Algorithmic trading and risk assessment." },
      { img: sp11, name: "Lachheb Abdelbassat", time: "11:00 AM - 12:30 PM", title: "Generative AI", desc: "Creating content with neural networks." },
      { img: sp12, name: "Mabrok Siradj", time: "2:00 PM - 3:30 PM", title: "Future of Work", desc: "How AI is reshaping careers and industries." },
    ],
  };

  const [selectedDay, setSelectedDay] = useState(1);
  const [fade, setFade] = useState(true);

  const handleDayChange = (day) => {
    setFade(false);
    setTimeout(() => {
      setSelectedDay(day);
      setFade(true);
    }, 150);
  };

  const handleRegisterClick = () => navigate("/register");
  const [countdownRef, countdownInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.2 });
  const [joinRef, joinInView] = useInView({ threshold: 0.3 });
  const [themesRef, themesInView] = useInView({ threshold: 0.2 });
  return (
    <>
      <Navbar />
      <div className="hero-carousel">
        {currentSlide === 0 && (
          <section className="hero" style={{ "--bg-image": `url(${heroBg})` }}>
            <div className="contentWrapper">
              <div className="leftContent animate-on-load">
                <h1 className="mainTitle">AI & Future <br /> Science Summit</h1>
                <div className="heroButtons">
                  <button className="filledBtn hover-lift" onClick={handleRegisterClick}>
                    Register
                  </button>
                </div>
              </div>
              <div className="rightImages animate-on-load">
                <div className="imageStack">
                  <img src={speakerImg} alt="AI Summit speaker" className="topImage" />
                  <img src={audienceImg} alt="Future tech audience" className="bottomImage" />
                </div>
              </div>
            </div>
            <div className="floatingText">CONF2026</div>
          </section>
        )}

        {currentSlide === 1 && (
          <section className="hero-video">
            <video autoPlay loop muted playsInline className="hero-background-video">
              <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="hero-video-overlay animate-on-load">
              <h2>Experience the Future</h2>
              <button className="filledBtn hover-lift" onClick={handleRegisterClick}>
                Register Now
              </button>
            </div>
          </section>
        )}

        <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
          <FaChevronRight />
        </button>
        <div className="carousel-dots">
          {[0, 1].map((index) => (
            <span
              key={index}
              className={`carousel-dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      <section ref={countdownRef} className={`countdown-section ${countdownInView ? "in-view" : ""}`}>
        <div className="countdown-container">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div className="countdown-item" key={unit}>
              <span className="countdown-number">{formatNumber(value)}</span>
              <span className="countdown-label">{unit}</span>
            </div>
          ))}
        </div>
      </section>
      <section ref={contactRef} className={`contact-section ${contactInView ? "in-view" : ""}`}>
        <div className="contact-grid">
          <div className="contact-card hover-lift">
            <FaEnvelope className="contact-icon" size={28} />
            <span className="contact-text">conference@SciConnect.com</span>
          </div>
          <div className="contact-card hover-lift">
            <FaMapMarkerAlt className="contact-icon" size={28} />
            <span className="contact-text">Blida, Algeria</span>
          </div>
          <div className="contact-card hover-lift">
            <FaPhoneAlt className="contact-icon" size={28} />
            <span className="contact-text">0252836789</span>
          </div>
        </div>
      </section>

      <section ref={joinRef} className={`join-event-section ${joinInView ? "in-view" : ""}`}>
        <h2 className="join-event-title">Join the Next Coming Event</h2>
        <div className="join-event-content">
          <div className="ellipse-visual">
            <img src={ellipseBg} alt="Ellipse background" className="ellipse-large-img" />
            <div className="ellipse-small">
              <img src={Img1} alt="Speaker" className="speaker-center-img" />
            </div>
          </div>
          <div className="join-event-text">
            <h3 className="event-headline">Be inspired by expert speakers</h3>
            <p className="event-description">
              Plan your week to make the most of all the sessions and labs,
              Community Eventor activities, and fun ways to connect with other creatives.
            </p>
            <div className="event-stats">
              <div className="stat-item">
                <span className="stat-number">04</span>
                <span className="stat-label">days</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12+</span>
                <span className="stat-label">speakers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="schedule-section">
        <div className="schedule-container">
          <div className="day-tabs">
            {[1, 2, 3, 4].map((day) => (
              <button
                key={day}
                className={`day-tab ${selectedDay === day ? "active" : ""}`}
                onClick={() => handleDayChange(day)}
              >
                Day 0{day}
                {selectedDay === day && <span className="active-dot" />}
              </button>
            ))}
          </div>

          <div className={`speaker-cards ${fade ? "fade-in" : "fade-out"}`}>
            {speakersData[selectedDay].map((speaker, index) => {
              return (
                <div className="speaker-card hover-lift" key={index}>
                  <div className="card-img">
                    <img src={speaker.img} alt={speaker.name} />
                  </div>
                  <div className="card-meta">
                    <span className="speaker-name">{speaker.name}</span>
                    <span className="speaker-time">{speaker.time}</span>
                  </div>
                  <div className="card-info">
                    <h4 className="session-title">{speaker.title}</h4>
                    <p className="session-desc">{speaker.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={themesRef} className={`home-themes-section ${themesInView ? "in-view" : ""}`}>
        <div className="home-themes-container">
          <h2 className="home-themes-title">Conference Themes</h2>
          <div className="home-themes-grid">
            {[
              { icon: <FaBrain />, name: "AI & Cognition", tagline: "Exploring human-like intelligence" },
              { icon: <FaChartBar />, name: "Data Science", tagline: "Insights from massive datasets" },
              { icon: <FaShieldAlt />, name: "Cybersecurity", tagline: "Protecting the digital frontier" },
              { icon: <FaRobot />, name: "Robotics", tagline: "Machines that move & think" },
              { icon: <FaCloud />, name: "Cloud & Edge", tagline: "Scalable, low-latency infrastructure" },
              { icon: <FaAtom />, name: "Quantum Computing", tagline: "The next computational leap" },
            ].map((theme, idx) => (
              <div className="home-theme-card hover-lift" key={idx}>
                <div className="home-theme-icon">{theme.icon}</div>
                <h3 className="home-theme-name">{theme.name}</h3>
                <p className="home-theme-tagline">{theme.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;