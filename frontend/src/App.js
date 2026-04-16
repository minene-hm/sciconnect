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
import AdminLayout from './dashboard/admin/layout/AdminLayout';
import Dashboard from './dashboard/admin/pages/Dashboard';
import SpeakerHub from './dashboard/admin/pages/SpeakerHub';
import SubmissionCenter from './dashboard/admin/pages/SubmissionCenter';
import AgendaEditor from './dashboard/admin/pages/AgendaEditor';
import CertificateTool from './dashboard/admin/pages/CertificateTool';
import RegistrationDesk from './dashboard/admin/pages/RegistrationDesk';
import SupportInbox from './dashboard/admin/pages/SupportInbox';

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

          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="speakers" element={<SpeakerHub />} />
          <Route path="submissions" element={<SubmissionCenter />} />
          <Route path="agenda" element={<AgendaEditor />} />
          <Route path="certificates" element={<CertificateTool />} />
          <Route path="registration-desk" element={<RegistrationDesk />} />
          <Route path="support" element={<SupportInbox />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;