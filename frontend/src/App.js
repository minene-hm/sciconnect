import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Speakers from "./pages/Speakers/Speakers";
import Program from "./pages/Program/Program";
import Contact from "./pages/Contact/Contact";
import Committee from "./pages/Committee/Committee";
import Register from "./pages/Register/Register";
import SpeakerLayout from './dashboard/speaker/layout/SpeakerLayout';
import Profile from './dashboard/speaker/pages/Profile';
import SubmitTalk from './dashboard/speaker/pages/SubmitTalk';
import StatusTracking from './dashboard/speaker/pages/StatusTracking';
import Reports from './dashboard/speaker/pages/Reports';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/program" element={<Program />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard/speaker" element={<SpeakerLayout />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="submit-talk" element={<SubmitTalk />} />
          <Route path="status" element={<StatusTracking />} />
          <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;