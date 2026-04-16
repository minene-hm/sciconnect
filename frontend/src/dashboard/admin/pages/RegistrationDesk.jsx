import { useState } from 'react';
import { FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';

const initialParticipants = [
  { id: 1, fullName: 'Douaa youcef', affiliation: 'MIT', position: 'Researcher', interest: 'AI & Cognition', status: 'Registered', email: 'douaa@example.com' },
  { id: 2, fullName: 'Lina mohamed', affiliation: 'Stanford', position: 'Student', interest: 'Data Science', status: 'Registered', email: 'lina@example.com' },
  { id: 3, fullName: 'salah dib', affiliation: 'University of Blida', position: 'Engineer', interest: 'Cybersecurity', status: 'Attended', email: 'salah@example.com' },
];

const initialApplicants = [
  { id: 1, fullName: 'Dr. Ahmed Benali', expertise: 'AI Ethics', yearsExp: 12, bio: 'Professor with 12 years experience.', email: 'ahmed@univ.dz', status: 'pending' },
  { id: 2, fullName: 'Prof. Samira Khelif', expertise: 'Renewable Energy', yearsExp: 8, bio: 'Research lead at CDER.', email: 'samira@cder.dz', status: 'pending' },
  { id: 3, fullName: 'Dr. Nadia Ouali', expertise: 'Data Science', yearsExp: 6, bio: 'Senior data scientist.', email: 'nadia@data.dz', status: 'pending' },
];

const RegistrationDesk = () => {
  const [participants, setParticipants] = useState(initialParticipants);
  const [applicants, setApplicants] = useState(initialApplicants);

  const updateParticipantStatus = (id, newStatus) => {
    setParticipants(prev =>
      prev.map(p => p.id === id ? { ...p, status: newStatus } : p)
    );
  };

  const sendParticipantConfirmation = (email, name) => {
    alert(`📧 Confirmation email sent to ${name} (${email}) – Welcome to SciConnect!`);
  };

  const sendApplicantConfirmation = (email, name) => {
    alert(`📧 Confirmation email sent to ${name} (${email}) – Your application has been received.`);
  };

  const handleCommitteeDecision = (applicant, decision) => {
    if (decision === 'accept') {
      setApplicants(prev => prev.filter(a => a.id !== applicant.id));
      alert(`✅ Accepted ${applicant.fullName}. Dashboard committee count will increase.`);
    } else {
      setApplicants(prev => prev.filter(a => a.id !== applicant.id));
      alert(`❌ Rejected ${applicant.fullName}.`);
    }
  };

  return (
    <div className="registration-desk">
      <h2>Registration Desk</h2>

      <div className="desk-section">
        <h3>📋 Participant (Attendees)</h3>
        <div className="desk-table-container">
          <table className="desk-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Affiliation</th>
                <th>Position</th>
                <th>Area of Interest</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {participants.map(p => (
                <tr key={p.id}>
                  <td>{p.fullName}</td>
                  <td>{p.affiliation}</td>
                  <td>{p.position}</td>
                  <td>{p.interest}</td>
                  <td>
                    <select
                      className="status-select"
                      value={p.status}
                      onChange={(e) => updateParticipantStatus(p.id, e.target.value)}
                    >
                      <option>Registered</option>
                      <option>Attended</option>
                    </select>
                  </td>
                  <td className="actions-cell">
                    <button className="btn-email" onClick={() => sendParticipantConfirmation(p.email, p.fullName)}>
                      <FaEnvelope /> Send Confirmation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="desk-section">
        <h3>👥 Committee Review Board (Applicants)</h3>
        <div className="desk-table-container">
          <table className="desk-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Field of Expertise</th>
                <th>Years of Experience</th>
                <th>Short Bio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(app => (
                <tr key={app.id}>
                  <td>{app.fullName}</td>
                  <td>{app.expertise}</td>
                  <td>{app.yearsExp} yrs</td>
                  <td className="bio-cell">{app.bio}</td>
                  <td className="actions-cell">
                    <button className="btn-accept" onClick={() => handleCommitteeDecision(app, 'accept')}>
                      <FaCheck /> Accept
                    </button>
                    <button className="btn-reject" onClick={() => handleCommitteeDecision(app, 'reject')}>
                      <FaTimes /> Reject
                    </button>
                    <button className="btn-email" onClick={() => sendApplicantConfirmation(app.email, app.fullName)}>
                      <FaEnvelope /> Send Confirmation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDesk;