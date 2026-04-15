import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./Register.css";
import videoBg from "../../assets/re4.mp4";

const Register = () => {
  const [activeTab, setActiveTab] = useState("participant");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [speakerShowLogin, setSpeakerShowLogin] = useState(false);

  const [participant, setParticipant] = useState({
    fullName: "",
    email: "",
    phone: "",
    affiliation: "",
    position: "",
    interest: "",
    motivation: "",
    attendedBefore: "",
    linkedin: "",
  });

  const [organizer, setOrganizer] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    expertise: "",
    yearsExperience: "",
    bio: "",
    motivation: "",
    organizedBefore: "",
    cv: null,
  });

  const [speaker, setSpeaker] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    currentPosition: "",
    department: "",
    institution: "",
    institutionCountry: "",
    educationLevel: "",
    biography: "",
    externalLinks: "",
    findOutHow: "",
  });

  const handleParticipantChange = (e) => {
    const { name, value } = e.target;
    setParticipant((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOrganizerChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setOrganizer((prev) => ({ ...prev, cv: files[0] }));
    } else {
      setOrganizer((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSpeakerChange = (e) => {
    const { name, value } = e.target;
    setSpeaker((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateParticipant = () => {
    const err = {};
    if (!participant.fullName.trim()) err.fullName = "Required";
    if (!participant.email.trim()) err.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participant.email))
      err.email = "Invalid email";
    if (!participant.phone.trim()) err.phone = "Required";
    if (!participant.affiliation.trim()) err.affiliation = "Required";
    if (!participant.position) err.position = "Select an option";
    if (!participant.interest) err.interest = "Select an interest";
    if (!participant.motivation.trim()) err.motivation = "Required";
    return err;
  };

  const validateOrganizer = () => {
    const err = {};
    if (!organizer.fullName.trim()) err.fullName = "Required";
    if (!organizer.email.trim()) err.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organizer.email))
      err.email = "Invalid email";
    if (!organizer.phone.trim()) err.phone = "Required";
    if (!organizer.organization.trim()) err.organization = "Required";
    if (!organizer.position.trim()) err.position = "Required";
    if (!organizer.expertise.trim()) err.expertise = "Required";
    if (!organizer.yearsExperience) err.yearsExperience = "Select experience";
    if (!organizer.bio.trim()) err.bio = "Required";
    if (!organizer.motivation.trim()) err.motivation = "Required";
    return err;
  };

  const validateSpeakerRegistration = () => {
    const err = {};
    if (!speaker.email.trim()) err.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(speaker.email))
      err.email = "Invalid email";
    if (!speaker.password) err.password = "Required";
    else if (speaker.password.length < 6) err.password = "Must be at least 6 characters";
    if (!speaker.confirmPassword) err.confirmPassword = "Please confirm password";
    else if (speaker.password !== speaker.confirmPassword) err.confirmPassword = "Passwords do not match";
    if (!speaker.firstName.trim()) err.firstName = "Required";
    if (!speaker.lastName.trim()) err.lastName = "Required";
    if (!speaker.currentPosition) err.currentPosition = "Select a position";
    if (!speaker.institution.trim()) err.institution = "Required";
    if (!speaker.institutionCountry.trim()) err.institutionCountry = "Required";
    if (!speaker.educationLevel) err.educationLevel = "Select education level";
    if (!speaker.biography.trim()) err.biography = "Required";
    if (!speaker.findOutHow) err.findOutHow = "Please select an option";
    return err;
  };

  const handleParticipantSubmit = (e) => {
    e.preventDefault();
    const err = validateParticipant();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    console.log("Participant:", participant);
    setSubmitted(true);
  };

  const handleOrganizerSubmit = (e) => {
    e.preventDefault();
    const err = validateOrganizer();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    console.log("Organizer:", organizer);
    setSubmitted(true);
  };

  const handleSpeakerRegisterSubmit = (e) => {
    e.preventDefault();
    const err = validateSpeakerRegistration();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    console.log("Speaker Registration:", speaker);
    setSubmitted(true);
  };

  const handleSpeakerLoginSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!speaker.email.trim()) err.email = "Email required";
    if (!speaker.password.trim()) err.password = "Password required";
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    console.log("Speaker Login:", { email: speaker.email, password: speaker.password });
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setSpeakerShowLogin(false);
    setParticipant({
      fullName: "",
      email: "",
      phone: "",
      affiliation: "",
      position: "",
      interest: "",
      motivation: "",
      attendedBefore: "",
      linkedin: "",
    });
    setOrganizer({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      position: "",
      expertise: "",
      yearsExperience: "",
      bio: "",
      motivation: "",
      organizedBefore: "",
      cv: null,
    });
    setSpeaker({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      currentPosition: "",
      department: "",
      institution: "",
      institutionCountry: "",
      educationLevel: "",
      biography: "",
      externalLinks: "",
      findOutHow: "",
    });
    setErrors({});
  };

  return (
    <div className="register-page">
      <video className="register-video" src={videoBg} autoPlay muted loop playsInline />
      <Link to="/" className="register-back-home">
        <span className="register-back-arrow">←</span> Back to Home
      </Link>
      <div className="register-container">
        {!submitted ? (
          <>
            <div className="register-tabs">
              <button
                className={`register-tab-btn ${activeTab === "participant" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("participant");
                  setSpeakerShowLogin(false);
                  setErrors({});
                }}
              >
                Participant
              </button>
              <button
                className={`register-tab-btn ${activeTab === "organizer" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("organizer");
                  setSpeakerShowLogin(false);
                  setErrors({});
                }}
              >
                Organizer
              </button>
              <button
                className={`register-tab-btn ${activeTab === "speaker" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("speaker");
                  setSpeakerShowLogin(false);
                  setErrors({});
                }}
              >
                Speaker
              </button>
            </div>

            {activeTab === "participant" && (
              <form className="register-form register-glass-card" onSubmit={handleParticipantSubmit}>
                <h2>Attendee Registration</h2>

                <div className="register-form-group">
                  <label>Full Name *</label>
                  <input
                    name="fullName"
                    value={participant.fullName}
                    onChange={handleParticipantChange}
                    className={errors.fullName ? "register-error" : ""}
                  />
                  {errors.fullName && <span className="register-error-msg">{errors.fullName}</span>}
                </div>

                <div className="register-form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={participant.email}
                    onChange={handleParticipantChange}
                    className={errors.email ? "register-error" : ""}
                  />
                  {errors.email && <span className="register-error-msg">{errors.email}</span>}
                </div>

                <div className="register-form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={participant.phone}
                    onChange={handleParticipantChange}
                    className={errors.phone ? "register-error" : ""}
                  />
                  {errors.phone && <span className="register-error-msg">{errors.phone}</span>}
                </div>

                <div className="register-form-group">
                  <label>Affiliation (University / Company) *</label>
                  <input
                    name="affiliation"
                    value={participant.affiliation}
                    onChange={handleParticipantChange}
                    className={errors.affiliation ? "register-error" : ""}
                  />
                  {errors.affiliation && <span className="register-error-msg">{errors.affiliation}</span>}
                </div>

                <div className="register-form-group">
                  <label>Position *</label>
                  <div className="register-radio-group">
                    {["Student", "Researcher", "Engineer", "Other"].map((opt) => (
                      <label key={opt} className="register-radio-label">
                        <input
                          type="radio"
                          name="position"
                          value={opt}
                          checked={participant.position === opt}
                          onChange={handleParticipantChange}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {errors.position && <span className="register-error-msg">{errors.position}</span>}
                </div>

                <div className="register-form-group">
                  <label>Area of Interest *</label>
                  <select
                    name="interest"
                    value={participant.interest}
                    onChange={handleParticipantChange}
                    className={errors.interest ? "register-error" : ""}
                  >
                    <option value="">Select...</option>
                    <option value="AI">AI & Machine Learning</option>
                    <option value="Renewable">Renewable Energy</option>
                    <option value="Data">Data Science</option>
                    <option value="Cyber">Cybersecurity</option>
                    <option value="Health">Health Technology</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.interest && <span className="register-error-msg">{errors.interest}</span>}
                </div>

                <div className="register-form-group">
                  <label>Why do you want to attend? *</label>
                  <textarea
                    name="motivation"
                    rows="3"
                    value={participant.motivation}
                    onChange={handleParticipantChange}
                    className={errors.motivation ? "register-error" : ""}
                  />
                  {errors.motivation && <span className="register-error-msg">{errors.motivation}</span>}
                </div>

                <div className="register-form-group">
                  <label>Previous conferences attended?</label>
                  <select
                    name="attendedBefore"
                    value={participant.attendedBefore}
                    onChange={handleParticipantChange}
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="register-form-group">
                  <label>LinkedIn / Portfolio URL</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={participant.linkedin}
                    onChange={handleParticipantChange}
                    placeholder="https://"
                  />
                </div>

                <button type="submit" className="register-submit-btn">
                  Submit Registration
                </button>
              </form>
            )}

            {activeTab === "organizer" && (
              <form className="register-form register-glass-card" onSubmit={handleOrganizerSubmit}>
                <h2>Join Committee</h2>

                <div className="register-form-group">
                  <label>Full Name *</label>
                  <input
                    name="fullName"
                    value={organizer.fullName}
                    onChange={handleOrganizerChange}
                    className={errors.fullName ? "register-error" : ""}
                  />
                  {errors.fullName && <span className="register-error-msg">{errors.fullName}</span>}
                </div>

                <div className="register-form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={organizer.email}
                    onChange={handleOrganizerChange}
                    className={errors.email ? "register-error" : ""}
                  />
                  {errors.email && <span className="register-error-msg">{errors.email}</span>}
                </div>

                <div className="register-form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={organizer.phone}
                    onChange={handleOrganizerChange}
                    className={errors.phone ? "register-error" : ""}
                  />
                  {errors.phone && <span className="register-error-msg">{errors.phone}</span>}
                </div>

                <div className="register-form-group">
                  <label>Institution / Organization *</label>
                  <input
                    name="organization"
                    value={organizer.organization}
                    onChange={handleOrganizerChange}
                    className={errors.organization ? "register-error" : ""}
                  />
                  {errors.organization && <span className="register-error-msg">{errors.organization}</span>}
                </div>

                <div className="register-form-group">
                  <label>Position *</label>
                  <input
                    name="position"
                    value={organizer.position}
                    onChange={handleOrganizerChange}
                    placeholder="e.g., Professor"
                    className={errors.position ? "register-error" : ""}
                  />
                  {errors.position && <span className="register-error-msg">{errors.position}</span>}
                </div>

                <div className="register-form-group">
                  <label>Field of Expertise *</label>
                  <input
                    name="expertise"
                    value={organizer.expertise}
                    onChange={handleOrganizerChange}
                    className={errors.expertise ? "register-error" : ""}
                  />
                  {errors.expertise && <span className="register-error-msg">{errors.expertise}</span>}
                </div>

                <div className="register-form-group">
                  <label>Years of Experience *</label>
                  <select
                    name="yearsExperience"
                    value={organizer.yearsExperience}
                    onChange={handleOrganizerChange}
                    className={errors.yearsExperience ? "register-error" : ""}
                  >
                    <option value="">Select...</option>
                    <option value="1-5">1-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                  {errors.yearsExperience && <span className="register-error-msg">{errors.yearsExperience}</span>}
                </div>

                <div className="register-form-group">
                  <label>Short Bio *</label>
                  <textarea
                    name="bio"
                    rows="3"
                    value={organizer.bio}
                    onChange={handleOrganizerChange}
                    className={errors.bio ? "register-error" : ""}
                  />
                  {errors.bio && <span className="register-error-msg">{errors.bio}</span>}
                </div>

                <div className="register-form-group">
                  <label>Why do you want to join the committee? *</label>
                  <textarea
                    name="motivation"
                    rows="3"
                    value={organizer.motivation}
                    onChange={handleOrganizerChange}
                    className={errors.motivation ? "register-error" : ""}
                  />
                  {errors.motivation && <span className="register-error-msg">{errors.motivation}</span>}
                </div>

                <div className="register-form-group">
                  <label>Previous conferences organized?</label>
                  <select
                    name="organizedBefore"
                    value={organizer.organizedBefore}
                    onChange={handleOrganizerChange}
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="register-form-group">
                  <label>CV Upload (PDF/DOC)</label>
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleOrganizerChange}
                  />
                </div>

                <button type="submit" className="register-submit-btn">
                  Submit Application
                </button>
              </form>
            )}

            {activeTab === "speaker" && (
              <form
                className="register-form register-glass-card"
                onSubmit={speakerShowLogin ? handleSpeakerLoginSubmit : handleSpeakerRegisterSubmit}
              >
                <h2>{speakerShowLogin ? "Speaker Login" : "Become a Speaker"}</h2>

                {speakerShowLogin ? (
                  <>
                    <div className="register-form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={speaker.email}
                        onChange={handleSpeakerChange}
                        className={errors.email ? "register-error" : ""}
                      />
                      {errors.email && <span className="register-error-msg">{errors.email}</span>}
                    </div>
                    <div className="register-form-group">
                      <label>Password *</label>
                      <input
                        type="password"
                        name="password"
                        value={speaker.password}
                        onChange={handleSpeakerChange}
                        className={errors.password ? "register-error" : ""}
                      />
                      {errors.password && <span className="register-error-msg">{errors.password}</span>}
                    </div>
                    <button type="submit" className="register-submit-btn">Login</button>
                    <div className="register-toggle-form-link">
                      <span onClick={() => { setSpeakerShowLogin(false); setErrors({}); }}>
                        Don't have an account? Register as Speaker
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="register-form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={speaker.email}
                        onChange={handleSpeakerChange}
                        className={errors.email ? "register-error" : ""}
                      />
                      {errors.email && <span className="register-error-msg">{errors.email}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>Password *</label>
                      <input
                        type="password"
                        name="password"
                        value={speaker.password}
                        onChange={handleSpeakerChange}
                        className={errors.password ? "register-error" : ""}
                      />
                      {errors.password && <span className="register-error-msg">{errors.password}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>Confirm Password *</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={speaker.confirmPassword}
                        onChange={handleSpeakerChange}
                        className={errors.confirmPassword ? "register-error" : ""}
                      />
                      {errors.confirmPassword && <span className="register-error-msg">{errors.confirmPassword}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>First Name *</label>
                      <input
                        name="firstName"
                        value={speaker.firstName}
                        onChange={handleSpeakerChange}
                        className={errors.firstName ? "register-error" : ""}
                      />
                      {errors.firstName && <span className="register-error-msg">{errors.firstName}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>Last Name *</label>
                      <input
                        name="lastName"
                        value={speaker.lastName}
                        onChange={handleSpeakerChange}
                        className={errors.lastName ? "register-error" : ""}
                      />
                      {errors.lastName && <span className="register-error-msg">{errors.lastName}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>Phone (optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={speaker.phone}
                        onChange={handleSpeakerChange}
                      />
                    </div>

                    <div className="register-form-group">
                      <label>Current Position *</label>
                      <select
                        name="currentPosition"
                        value={speaker.currentPosition}
                        onChange={handleSpeakerChange}
                        className={errors.currentPosition ? "register-error" : ""}
                      >
                        <option value="">Select...</option>
                        <option value="Student">Student</option>
                        <option value="Researcher">Researcher</option>
                        <option value="Professor">Professor</option>
                        <option value="Industry Professional">Industry Professional</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.currentPosition && <span className="register-error-msg">{errors.currentPosition}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>Department / Faculty</label>
                      <input
                        name="department"
                        value={speaker.department}
                        onChange={handleSpeakerChange}
                        placeholder="e.g., Computer Science"
                      />
                    </div>

                    <div className="register-form-group">
                      <label>Current Institution *</label>
                      <input
                        name="institution"
                        value={speaker.institution}
                        onChange={handleSpeakerChange}
                        className={errors.institution ? "register-error" : ""}
                      />
                      {errors.institution && <span className="register-error-msg">{errors.institution}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>Institution Country *</label>
                      <input
                        name="institutionCountry"
                        value={speaker.institutionCountry}
                        onChange={handleSpeakerChange}
                        className={errors.institutionCountry ? "register-error" : ""}
                        placeholder="e.g., United States"
                      />
                      {errors.institutionCountry && <span className="register-error-msg">{errors.institutionCountry}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>Last Level of Education Completed *</label>
                      <select
                        name="educationLevel"
                        value={speaker.educationLevel}
                        onChange={handleSpeakerChange}
                        className={errors.educationLevel ? "register-error" : ""}
                      >
                        <option value="">Select...</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="PhD">PhD</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.educationLevel && <span className="register-error-msg">{errors.educationLevel}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>Biography (short description about you) *</label>
                      <textarea
                        name="biography"
                        rows="4"
                        value={speaker.biography}
                        onChange={handleSpeakerChange}
                        className={errors.biography ? "register-error" : ""}
                        placeholder="Tell us about your background, expertise, and what you would like to speak about..."
                      />
                      {errors.biography && <span className="register-error-msg">{errors.biography}</span>}
                    </div>

                    <div className="register-form-group">
                      <label>External Links (LinkedIn, Google Scholar, Portfolio, etc.)</label>
                      <input
                        type="url"
                        name="externalLinks"
                        value={speaker.externalLinks}
                        onChange={handleSpeakerChange}
                        placeholder="https://"
                      />
                    </div>

                    <div className="register-form-group">
                      <label>How did you find out about SciConnect? *</label>
                      <select
                        name="findOutHow"
                        value={speaker.findOutHow}
                        onChange={handleSpeakerChange}
                        className={errors.findOutHow ? "register-error" : ""}
                      >
                        <option value="">Select...</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Friend">Friend</option>
                        <option value="University">University</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.findOutHow && <span className="register-error-msg">{errors.findOutHow}</span>}
                    </div>

                    <button type="submit" className="register-submit-btn">
                      Submit Speaker Application
                    </button>
                    <div className="register-toggle-form-link">
                      <span onClick={() => { setSpeakerShowLogin(true); setErrors({}); }}>
                        Already have an account? Login
                      </span>
                    </div>
                  </>
                )}
              </form>
            )}
          </>
        ) : (
          <div className="register-success-message register-glass-card">
            <FaCheckCircle className="register-success-icon" />
            <h2>Success!</h2>
            <p>Your request has been successfully submitted.</p>
            <p>Our team will review your application and contact you soon.</p>
            <button className="register-submit-btn" onClick={resetForm}>
              Submit Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;