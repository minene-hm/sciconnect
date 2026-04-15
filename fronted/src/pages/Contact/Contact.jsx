import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Contact.css";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import universityLogo from "../../assets/univ-blida-logo.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    console.log("Form submitted:", formData);
    setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const blidaCoords = [36.4700, 2.8277];

  return (
    <>
      <Navbar />
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            We'd love to hear from you. Reach out and we'll get back to you shortly.
          </p>
        </div>
        <div className="contact-hero-divider"></div>
      </section>
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaEnvelope className="info-icon" />
              </div>
              <h3>Email Us</h3>
              <p>conference@SciConnect.com</p>
              <span className="info-sub">Response within 24h</span>
            </div>
            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaMapMarkerAlt className="info-icon" />
              </div>
              <h3>Visit Us</h3>
              <p>Blida, Algeria</p>
              <span className="info-sub">University of Blida 1</span>
            </div>
            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaPhoneAlt className="info-icon" />
              </div>
              <h3>Call Us</h3>
              <p>0252836789</p>
              <span className="info-sub">Mon-Fri, 9am-6pm</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container contact-main-grid">
          <div className="contact-form-wrapper">
            <h2 className="form-title">Send Us a Message</h2>
            {submitted && (
              <div className="form-success">
                <FaPaperPlane /> Thank you! Your message has been sent.
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row two-col">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "error" : ""}
                    placeholder="Minene"
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "error" : ""}
                    placeholder="Ahmia"
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  placeholder="Minene_hm@example.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? "error" : ""}
                  placeholder="What is this about?"
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "error" : ""}
                  placeholder="Tell us how we can help..."
                ></textarea>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>
              <button type="submit" className="submit-btn">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </div>

          <div className="contact-map-wrapper">
            <h2 className="map-title">Our Location</h2>
            <div className="map-container-interactive">
              <MapContainer
                center={blidaCoords}
                zoom={12}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%", borderRadius: "20px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={blidaCoords}>
                  <Popup>
                    University of Blida 1 <br /> Route de Soumâa, Blida, Algeria
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <p className="map-caption">
              University of Blida 1, Route de Soumâa, Blida, Algeria
            </p>
            <div className="university-logo-wrapper">
              <img 
                src={universityLogo} 
                alt="University of Blida 1 Logo" 
                className="university-logo-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23BDA6CE' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'%3E%3C/path%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;