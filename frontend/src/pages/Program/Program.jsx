import React, { useRef, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Program.css";
import videoBg from "../../assets/hook.mp4";

import session1 from "../../assets/session1.jpg";
import session2 from "../../assets/session2.jpg";
import session3 from "../../assets/session3.jpg";
import session4 from "../../assets/session4.jpg";
import { api } from "../../utils/api";

const Program = () => {
  const [apiAgenda, setApiAgenda] = useState([]);
  const scheduleRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Autoplay prevented:", err));
    }
  }, []);

  useEffect(() => {
    const loadAgenda = async () => {
      try {
        const result = await api.get("/api/agenda");
        if (Array.isArray(result)) {
          setApiAgenda(result);
        }
      } catch (error) {
        console.error("Failed to load agenda", error);
      }
    };
    loadAgenda();
  }, []);

  const scrollToSchedule = () => {
    scheduleRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const images = [session1, session2, session3, session4];
  const sessions = apiAgenda.map((item, index) => ({
    image: images[index % images.length],
    title: item.sessionTitle || "Session",
    description: item.theme || item.description || "Conference session details.",
    date: item.dateLabel || "TBD",
    time: item.timeSlot || "TBD",
    location: item.location || "Main Hall",
  }));

  return (
    <>
      <Navbar />
      <section className="video-hero">
        <div className="video-overlay"></div>
        <video
          ref={videoRef}
          className="hero-video"
          src={videoBg}
          muted
          loop
          playsInline
          autoPlay
        />
        <div className="video-hero-content">
          <h1 className="video-hero-title">SciConnect 2026</h1>
          <button className="video-hero-button" onClick={scrollToSchedule}>
            Explore Schedule
          </button>
        </div>
        <div className="scroll-hint">
          <span></span>
        </div>
      </section>

      <section className="schedule-section" ref={scheduleRef}>
        <div className="schedule-container">
          <h2 className="schedule-heading">Highlights & Session Schedule</h2>
          <div className="schedule-list">
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <div key={index} className="schedule-card">
                  <div className="card-image-col">
                    <img src={session.image} alt={session.title} />
                  </div>
                  <div className="card-details-col">
                    <h3 className="session-title">{session.title}</h3>
                    <p className="session-description">{session.description}</p>
                  </div>
                  <div className="card-stub-col">
                    <div className="stub-content">
                      <span className="stub-date">{session.date}</span>
                      <span className="stub-time">{session.time}</span>
                      <span className="stub-location">{session.location}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="schedule-empty-message">
                <p>No agenda sessions are available right now. Please check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="itinerary-section">
        <div className="itinerary-container">
          <h2 className="itinerary-main-title">Full Event Itinerary</h2>
          <div className="itinerary-grid">
            <div className="itinerary-column">
              <div className="column-header">
                <span className="day-label">Neural Architecture Search</span>
                <h3 className="date-title">Monday, May 15</h3>
              </div>
              <div className="time-slots">
                <div className="slot-item">
                  <span className="slot-time">08:00 – 10:00</span>
                  <span className="slot-event">Registration & Check-in</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">10:30 – 13:00</span>
                  <span className="slot-event">AI Trainings (Workshop A)</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">14:00 – 17:00</span>
                  <span className="slot-event">Advanced ML Bootcamp</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">19:00 – 22:00</span>
                  <span className="slot-event">Future of Automated AI Design</span>
                </div>
              </div>
            </div>

            <div className="itinerary-column">
              <div className="column-header">
                <span className="day-label">Human-AI Pair Programming</span>
                <h3 className="date-title">Tuesday, Jun 15</h3>
              </div>
              <div className="time-slots">
                <div className="slot-item">
                  <span className="slot-time">09:00 – 10:30</span>
                  <span className="slot-event">Registration & Check-in</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">11:00 – 12:30</span>
                  <span className="slot-event">AI Coding Assistants in Action</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">14:00 – 15:30</span>
                  <span className="slot-event">Building Apps with AI Pair Programmers</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">16:00 – 17:30</span>
                  <span className="slot-event">Future of Software Engineering</span>
                </div>
              </div>
            </div>

            <div className="itinerary-column">
              <div className="column-header">
                <span className="day-label"> Foundation Models</span>
                <h3 className="date-title">Wednesday, Jul 16</h3>
              </div>
              <div className="time-slots">
                <div className="slot-item">
                  <span className="slot-time">09:00 – 10:30</span>
                  <span className="slot-event">Registration & Check-in</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">11:00 – 12:30</span>
                  <span className="slot-event">Technical Talk: Vision + Language Models</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">14:00 – 15:30</span>
                  <span className="slot-event">Live Lab: Building Multimodal Applications</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">16:00 – 17:30</span>
                  <span className="slot-event"> Real-Time AI Reasoning Systems</span>
                </div>
              </div>
            </div>

            <div className="itinerary-column">
              <div className="column-header">
                <span className="day-label">Securing the AI Pipeline</span>
                <h3 className="date-title">Thursday, Sep 16</h3>
              </div>
              <div className="time-slots">
                <div className="slot-item">
                  <span className="slot-time">09:00 – 10:30</span>
                  <span className="slot-event">Registration & Check-in</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">11:00 – 12:30</span>
                  <span className="slot-event">Workshop: Data Protection Strategies</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">14:00 – 16:00</span>
                  <span className="slot-event">Hands-on: Preventing Prompt Injection Attacks</span>
                </div>
                <div className="slot-item">
                  <span className="slot-time">19:00 – Late</span>
                  <span className="slot-event">Panel: Future of AI Security Standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Program;