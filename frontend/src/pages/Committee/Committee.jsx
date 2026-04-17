import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Committee.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import co16 from "../../assets/co16.png";
import co15 from "../../assets/co15.png";
import co14 from "../../assets/co14.png";
import co13 from "../../assets/co13.png";
import co12 from "../../assets/co12.png";
import co11 from "../../assets/co11.png";
import co10 from "../../assets/co10.png";
import co9 from "../../assets/co9.png";
import co1 from "../../assets/co1.png";
import co2 from "../../assets/co2.png";
import co3 from "../../assets/co3.png";
import co4 from "../../assets/co4.png";
import co5 from "../../assets/co5.png";
import co6 from "../../assets/co6.png";
import co7 from "../../assets/co7.png";
import co8 from "../../assets/co8.png";

import teamAbstract from "../../assets/team-abstract.jpg";
import { api } from "../../utils/api";

const CommitteeCard = ({ img, name, role, institution }) => {
  return (
    <div className="committee-card">
      <div className="card-image-wrapper">
        <img src={img} alt={name} />
      </div>
      <h3 className="card-name">{name}</h3>
      <p className="card-role">{role}</p>
      <p className="card-institution">{institution}</p>
    </div>
  );
};

const Committee = () => {
  const [committeeMembers, setCommitteeMembers] = useState({ organizing: [], scientific: [] });
  const [loadingCommittee, setLoadingCommittee] = useState(true);

  const organizingImages = [co9, co1, co10, co2, co11, co3, co12, co4];
  const scientificImages = [co13, co5, co14, co6, co15, co7, co16, co8];

  useEffect(() => {
    const loadCommittee = async () => {
      try {
        const result = await api.get("/api/committee-members");
        if (result && result.organizing && result.scientific) {
          setCommitteeMembers(result);
        }
      } catch (error) {
        console.error("Failed to load committee data", error);
      } finally {
        setLoadingCommittee(false);
      }
    };
    loadCommittee();
  }, []);

  const organizingSource = committeeMembers.organizing.map((member, index) => ({
    ...member,
    img: organizingImages[index % organizingImages.length],
  }));

  const scientificSource = committeeMembers.scientific.map((member, index) => ({
    ...member,
    img: scientificImages[index % scientificImages.length],
  }));

  return (
    <>
      <Navbar />
      <section className="committee-hero">
        <div className="hero-dot-overlay"></div>
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-title committee-hero-title">Conference Committee</h1>
            <p className="hero-subtitle committee-hero-subtitle">
              Meet the experts and professionals behind the organization of this event
            </p>
          </div>
          <div className="hero-right">
            <div className="hero-image-wrapper">
              <img src={teamAbstract} alt="Team" className="hero-image" />
            </div>
            <div className="hero-dot-decoration"></div>
          </div>
        </div>
      </section>

      <section className="committee-section organizing-section">
        <div className="container">
          <h2 className="section-title">Organizing Committee</h2>
          <p className="section-intro">
            The organizing committee is responsible for planning, coordination, and execution of the conference.
          </p>
          
          <div className="carousel-wrapper">
            {loadingCommittee ? (
              <p>Loading committee members...</p>
            ) : organizingSource.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 20 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                className="committee-swiper"
              >
                {organizingSource.map((member, index) => (
                  <SwiperSlide key={`org-${index}`}>
                    <CommitteeCard {...member} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No organizing committee data available.</p>
            )}
          </div>
        </div>
      </section>

      <section className="committee-section scientific-section">
        <div className="container">
          <h2 className="section-title">Scientific Committee</h2>
          <p className="section-intro">
            The scientific committee ensures the quality of research and reviews submitted papers.
          </p>
          
          <div className="carousel-wrapper">
            {loadingCommittee ? (
              <p>Loading scientific committee members...</p>
            ) : scientificSource.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 20 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
                className="committee-swiper"
              >
                {scientificSource.map((member, index) => (
                  <SwiperSlide key={`sci-${index}`}>
                    <CommitteeCard {...member} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No scientific committee data available.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Committee;