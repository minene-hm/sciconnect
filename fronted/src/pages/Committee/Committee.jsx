import React from "react";
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
  const organizingMembers = [
    {
      img: co9,
      name: "Dr. Amine Bouzid",
      role: "Conference Chair",
      institution: "University of Algiers",
    },
    {
      img: co1,
      name: "Ms. Lina Boussouf",
      role: "Event Coordinator",
      institution: "Tech Innovators",
    },
    {
      img: co10,
      name: "Mr. Yacine Toumi",
      role: "Logistics Manager",
      institution: "Research Center of Blida",
    },
    {
      img: co2,
      name: "Dr. Nadia Mansouri",
      role: "Program Chair",
      institution: "USTHB, Algiers",
    },
    {
      img: co11,
      name: "Prof. Ali Ferhat",
      role: "Finance Chair",
      institution: "University of Blida 1",
    },
    {
      img: co3,
      name: "Ms. Amina Ziani",
      role: "Public Relations",
      institution: "InnovAlgérie",
    },
    {
      img: co12,
      name: "Mr. Rachid Hamdi",
      role: "Technical Director",
      institution: "CERIST",
    },
    {
      img: co4,
      name: "Dr. Leila Moussaoui",
      role: "Workshops Chair",
      institution: "ESI Algiers",
    },
  ];

  const scientificMembers = [
    {
      img: co13,
      name: "Prof. Mohamed Rahmani",
      role: "Artificial Intelligence",
      institution: "University of Oran",
    },
    {
      img: co5,
      name: "Dr. Lina Boussouf",
      role: "Data Science & Big Data",
      institution: "University of Constantine",
    },
    {
      img: co14,
      name: "Dr. Karim Haddad",
      role: "Renewable Energy",
      institution: "National Polytechnic School",
    },
    {
      img: co6,
      name: "Prof. Samira Ait Ali",
      role: "Robotics & Automation",
      institution: "USTO, Oran",
    },
    {
      img: co15,
      name: "Dr. Farid Meziane",
      role: "Cybersecurity",
      institution: "EMP, Algiers",
    },
    {
      img: co7,
      name: "Prof. Nawel Ouadah",
      role: "Bioinformatics",
      institution: "University of Tlemcen",
    },
    {
      img: co16,
      name: "Dr. Hichem Boudiaf",
      role: "Quantum Computing",
      institution: "CDTA, Algiers",
    },
    {
      img: co8,
      name: "Ms. Yasmine Kadi",
      role: "NLP & Linguistics",
      institution: "CRSTDLA",
    },
  ];

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
              {organizingMembers.map((member, index) => (
                <SwiperSlide key={`org-${index}`}>
                  <CommitteeCard {...member} />
                </SwiperSlide>
              ))}
            </Swiper>
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
              {scientificMembers.map((member, index) => (
                <SwiperSlide key={`sci-${index}`}>
                  <CommitteeCard {...member} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Committee;