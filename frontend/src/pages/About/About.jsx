import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./About.css";
import { FaPlay, FaCheck, FaChevronRight } from "react-icons/fa";
import { useInView } from "../../hooks/useInView";
import { api } from "../../utils/api";

import speakerImage from "../../assets/about-speaker.jpg";
import videoPoster from "../../assets/video-poster.jpg";

import logoUsthb from "../../assets/usthb.png";
import logoBlida from "../../assets/blida.png";
import logoSonatrach from "../../assets/sonatrach.png";
import logoAlgerieTelecom from "../../assets/algerie-telecom.png";
import logoYassir from "../../assets/yassir.png";
import logobymina from "../../assets/bymina.png";
import logoHamoud from "../../assets/hamoud.png";
import logoIHuawei from "../../assets/logoIHuawei.png";
import logoIoracle from "../../assets/oracle.png";

import aiImage from "../../assets/aiImage.png";
import energyImage from "../../assets/energyImage.png";
import dataImage from "../../assets/dataImage.png";
import cyberImage from "../../assets/cyberImage.png";
import healthImage from "../../assets/healthImage.png";

const About = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [requestedTheme, setRequestedTheme] = useState("");
  const [aboutInfo, setAboutInfo] = useState({ sponsors: [], leftItems: [], rightItems: [], themes: [] });
  const [loadingAboutInfo, setLoadingAboutInfo] = useState(true);

  const sponsorLogos = {
    usthb: logoUsthb,
    blida: logoBlida,
    sonatrach: logoSonatrach,
    algerieTelecom: logoAlgerieTelecom,
    yassir: logoYassir,
    bymina: logobymina,
    hamoud: logoHamoud,
    iHuawei: logoIHuawei,
    ioracle: logoIoracle,
  };

  const themeImages = {
    aiImage,
    energyImage,
    dataImage,
    cyberImage,
    healthImage,
  };

  useEffect(() => {
    const loadAboutInfo = async () => {
      try {
        const result = await api.get('/api/about-info');
        if (result) {
          setAboutInfo(result);
        }
      } catch (error) {
        console.error('Failed to load about info', error);
      } finally {
        setLoadingAboutInfo(false);
      }
    };
    loadAboutInfo();
  }, []);

  const sponsorsList = aboutInfo.sponsors.map((logoKey, index) => ({
    key: `${logoKey}-${index}`,
    src: sponsorLogos[logoKey] || logoUsthb,
  }));

  const leftItems = aboutInfo.leftItems || [];
  const rightItems = aboutInfo.rightItems || [];

  const themesList = aboutInfo.themes.map((theme, index) => ({
    ...theme,
    image: themeImages[theme.imageKey] || aiImage,
    id: `${theme.name}-${index}`,
  }));

  const handlePlayVideo = () => {
    setIsVideoOpen(true);
  };

  const submitThemeRequest = async () => {
    if (!requestedTheme.trim()) return;
    try {
      await api.post("/api/theme-requests", { theme: requestedTheme.trim() });
      setRequestedTheme("");
      alert("Theme request sent successfully.");
    } catch (error) {
      alert(error.message);
    }
  };

  const [mediaRef, mediaInView] = useInView({ threshold: 0.3 });
  const [sponsorsRef, sponsorsInView] = useInView({ threshold: 0.2 });
  const [whyAttendRef, whyAttendInView] = useInView({ threshold: 0.3 });
  const [themesRef, themesInView] = useInView({ threshold: 0.2 });
  const [requestRef, requestInView] = useInView({ threshold: 0.3 });

  return (
    <>
      <Navbar />
      <section className="about-hero animate-on-load">
        <div className="hero-dots-left"></div>
        <div className="hero-dots-right"></div>
        <div className="hero-content">
          <h1 className="about-hero-title">About the Conference</h1>
          <p className="about-hero-subtitle">
            An international platform for innovation, research, and collaboration.
          </p>
        </div>
      </section>

      <section ref={mediaRef} className={`about-media-section ${mediaInView ? "in-view" : ""}`}>
        <div className="container about-media-grid">
          <div className="media-left">
            <div className="media-stack">
              <img src={speakerImage} alt="Speaker at conference" className="media-bottom" />
              <div className="media-top">
                <img src={videoPoster} alt="Conference video preview" className="video-thumbnail" />
                <button className="play-button" onClick={handlePlayVideo}>
                  <FaPlay className="play-icon" />
                </button>
              </div>
            </div>
          </div>
          <div className="media-right">
            <p className="media-description">
              The International Scientific Conference is a global event that brings together 
              researchers, academics, and industry professionals to share knowledge, present 
              innovative ideas, and discuss the latest advancements in science and technology.
            </p>
          </div>
        </div>
      </section>

      {isVideoOpen && (
        <div className="video-modal" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content">
            <video controls autoPlay className="modal-video">
              <source src={require("../../assets/video-thumbnail.mp4")} type="video/mp4" />
            </video>
            <button className="close-modal" onClick={() => setIsVideoOpen(false)}>×</button>
          </div>
        </div>
      )}

      <section ref={sponsorsRef} className={`sponsors-section ${sponsorsInView ? "in-view" : ""}`}>
        <div className="container">
          <h3 className="sponsors-title">Our Partners & Sponsors</h3>
          <div className="logo-carousel">
            <div className="logo-track">
              {loadingAboutInfo ? (
                <p>Loading sponsors...</p>
              ) : sponsorsList.length > 0 ? (
                sponsorsList.map((logo) => (
                  <div key={logo.key} className="logo-item">
                    <img src={logo.src} alt={logo.key} />
                  </div>
                ))
              ) : (
                <p>No sponsor information is available.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section ref={whyAttendRef} className={`why-attend-section ${whyAttendInView ? "in-view" : ""}`}>
        <div className="liquid-background"></div>
        <div className="container why-attend-container">
          <h2 className="why-attend-title">Why Attend?</h2>
          <div className="why-attend-grid">
            <ul className="why-list">
              {loadingAboutInfo ? (
                <li>Loading reasons to attend...</li>
              ) : leftItems.length > 0 ? (
                leftItems.map((item, idx) => (
                  <li key={`left-${idx}`}>
                    <FaCheck className="check-icon" /> {item}
                  </li>
                ))
              ) : (
                <li>No attendance benefits available.</li>
              )}
            </ul>
            <ul className="why-list">
              {loadingAboutInfo ? (
                <li>Loading reasons to attend...</li>
              ) : rightItems.length > 0 ? (
                rightItems.map((item, idx) => (
                  <li key={`right-${idx}`}>
                    <FaCheck className="check-icon" /> {item}
                  </li>
                ))
              ) : (
                <li>No attendance benefits available.</li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <section ref={themesRef} className={`themes-cards-section ${themesInView ? "in-view" : ""}`}>
        <div className="container">
          <h2 className="themes-cards-title">Conference Themes</h2>
          <div className="themes-cards-grid">
            {loadingAboutInfo ? (
              <p>Loading conference themes...</p>
            ) : themesList.length > 0 ? (
              themesList.map((theme) => (
                <div key={theme.id} className="theme-card">
                  <div className="theme-card-image">
                    <img src={theme.image} alt={theme.name} />
                  </div>
                  <h4 className="theme-card-name">{theme.name}</h4>
                </div>
              ))
            ) : (
              <p>No themes are available right now.</p>
            )}
          </div>
        </div>
      </section>

      <section ref={requestRef} className={`theme-request-section ${requestInView ? "in-view" : ""}`}>
        <div className="container theme-request-container">
          <h3 className="theme-request-title">Want another theme to be present?</h3>
          <div className="theme-request-form">
            <input
              type="text"
              placeholder="Enter the theme..."
              className="theme-input"
              value={requestedTheme}
              onChange={(e) => setRequestedTheme(e.target.value)}
            />
            <button className="theme-submit" onClick={submitThemeRequest}>
              Send <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;