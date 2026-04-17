import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Speakers.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight, FaSearch } from "react-icons/fa";
import imgTopLeft from "../../assets/speaker-collage-1.jpg";
import imgCenter from "../../assets/speaker-collage-2.jpg";
import imgBottomRight from "../../assets/speaker-collage-3.jpg";
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
import { api } from "../../utils/api";

const Speakers = () => {
  const scrollToSearch = () => {
    const searchSection = document.getElementById("speakers-search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const defaultImages = [sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sp10, sp11, sp12];
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiSpeakers, setApiSpeakers] = useState([]);
  const [loadingSpeakers, setLoadingSpeakers] = useState(true);

  useEffect(() => {
    const loadSpeakers = async () => {
      try {
        const result = await api.get("/api/speakers");
        if (Array.isArray(result)) {
          setApiSpeakers(result);
        }
      } catch (error) {
        console.error("Failed to load speakers", error);
      } finally {
        setLoadingSpeakers(false);
      }
    };
    loadSpeakers();
  }, []);

  const featuredSpeakers = useMemo(
    () =>
      apiSpeakers.slice(0, 4).map((speaker, index) => ({
        name: speaker.name || "Speaker",
        image: speaker.photoUrl || defaultImages[index % defaultImages.length],
        bio:
          speaker.biography ||
          `${speaker.name || 'Our expert speaker'} explores ${speaker.scientificTheme || 'conference themes'} and contributes to the community.`,
      })),
    [apiSpeakers]
  );

  const activeSpeakerIndex = featuredSpeakers.length
    ? currentSpeakerIndex % featuredSpeakers.length
    : 0;

  const displayedSpeakers = useMemo(
    () =>
      apiSpeakers.map((speaker, index) => ({
        img: speaker.photoUrl || defaultImages[index % defaultImages.length],
        name: speaker.name || "Speaker",
        title: speaker.academicTitle || "Speaker",
        affiliation: speaker.affiliation || "",
        topic: speaker.scientificTheme || "General",
        domains: [speaker.scientificTheme || "General"],
      })),
    [apiSpeakers]
  );

  const nextSpeaker = () => {
    if (!featuredSpeakers.length) return;
    setFade(false);
    setTimeout(() => {
      setCurrentSpeakerIndex((prev) => (prev + 1) % featuredSpeakers.length);
      setFade(true);
    }, 150);
  };

  const filteredSpeakers = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return displayedSpeakers.filter(
      (speaker) =>
        speaker.name.toLowerCase().includes(query) ||
        speaker.domains.some((domain) => domain.toLowerCase().includes(query))
    );
  }, [searchQuery, displayedSpeakers]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <>
      <Navbar />

      <section className="speakers-page-hero">
        <div className="speakers-hero-wrapper">
          <div className="speakers-hero-inner">
            <div className="speakers-hero-top">
              <button className="speakers-search-pill" onClick={scrollToSearch}>
                Search
              </button>
            </div>

            <div className="speakers-hero-main-row">
              <div className="speakers-hero-left">
                <h1 className="speakers-hero-title">MEET OUR SPEAKERS</h1>
                <p className="speakers-hero-subtitle">
                  Discover leading experts and researchers from around the world.
                </p>
              </div>

              <div className="speakers-hero-right-collage">
                <div className="speakers-collage-particles">
                  <span className="speakers-particle speakers-dot-matrix"></span>
                  <span className="speakers-particle speakers-triangle speakers-t1"></span>
                  <span className="speakers-particle speakers-triangle speakers-t2"></span>
                  <span className="speakers-particle speakers-triangle speakers-t3"></span>
                  <span className="speakers-particle speakers-plus speakers-p1"></span>
                  <span className="speakers-particle speakers-plus speakers-p2"></span>
                  <span className="speakers-particle speakers-cross speakers-c1"></span>
                  <span className="speakers-particle speakers-cross speakers-c2"></span>
                </div>

                <div className="speakers-collage-container">
                  <img src={imgTopLeft} alt="Speaker" className="speakers-collage-img speakers-top-left" />
                  <img src={imgCenter} alt="Speaker" className="speakers-collage-img speakers-center" />
                  <img src={imgBottomRight} alt="Speaker" className="speakers-collage-img speakers-bottom-right" />

                  <div className="speakers-stats-badge">
                    <div className="speakers-badge-icon">🏆</div>
                    <div className="speakers-badge-text">
                      <span className="speakers-badge-number">+30</span>
                      <span className="speakers-badge-label">Speakers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="speakers-contact-bar">
        <div className="speakers-contact-bar-container">
          <span className="speakers-contact-item">
            <FaEnvelope className="speakers-contact-icon" /> speakers@sciconnect.com
          </span>
          <span className="speakers-contact-item">
            <FaPhoneAlt className="speakers-contact-icon" /> 0252836789
          </span>
          <span className="speakers-contact-item">
            <FaMapMarkerAlt className="speakers-contact-icon" /> Blida, Algeria
          </span>
        </div>
      </section>

      <section className="speakers-featured-section">
        <div className="speakers-container">
          <h2 className="speakers-featured-title">Meet Some of Our Speakers</h2>
          <div className="speakers-featured-card">
            {featuredSpeakers.length > 0 ? (
              <div className={`speakers-featured-content ${fade ? "speakers-fade-in" : "speakers-fade-out"}`}>
                <img
                  src={featuredSpeakers[activeSpeakerIndex].image}
                  alt={featuredSpeakers[activeSpeakerIndex].name}
                  className="speakers-featured-portrait"
                />
                <div className="speakers-featured-details">
                  <button className="speakers-nav-arrow" onClick={nextSpeaker} aria-label="Next speaker">
                    <FaArrowRight />
                  </button>
                  <h3 className="speakers-featured-name">
                    {featuredSpeakers[activeSpeakerIndex].name}
                  </h3>
                  <p className="speakers-featured-bio">
                    {featuredSpeakers[activeSpeakerIndex].bio}
                  </p>
                </div>
              </div>
            ) : (
              <div className="speakers-featured-empty">
                {loadingSpeakers ? (
                  <p>Loading speakers from the server...</p>
                ) : (
                  <p>No speaker data is available right now.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="speakers-search-results-section">
        <div className="speakers-container">
          <h2 className="speakers-section-title">Explore Our Expert Lineup</h2>
          <p className="speakers-section-subtitle">
            Search by name or domain to find the speakers you're looking for.
          </p>

          <div className="speakers-simple-search-wrapper" id="speakers-search-section">
            <div className="speakers-simple-search">
              <FaSearch className="speakers-search-icon-inside" />
              <input
                type="text"
                placeholder="Search by name or domain (e.g., AI, Robotics)..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="speakers-simple-search-input"
              />
            </div>
          </div>

          {searchQuery.trim() !== "" && (
            <div className="speakers-search-results-container">
              {filteredSpeakers.length > 0 ? (
                <div className="speakers-vertical-results-list">
                  {filteredSpeakers.map((speaker, idx) => (
                    <div key={idx} className="speakers-result-item">
                      <div className="speakers-result-image">
                        <img src={speaker.img} alt={speaker.name} />
                      </div>
                      <div className="speakers-result-details">
                        <h4 className="speakers-result-name">{speaker.name}</h4>
                        <p className="speakers-result-title">{speaker.title}</p>
                        <p className="speakers-result-affiliation">{speaker.affiliation}</p>
                        <p className="speakers-result-topic">
                          <span className="speakers-topic-label">Topic:</span> {speaker.topic}
                        </p>
                        <button className="speakers-view-profile-btn">View Profile</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="speakers-no-results-message">
                  <p>No speakers found matching "{searchQuery}".</p>
                  <p>Try searching for "AI", "Robotics", or "Data Science".</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Speakers;