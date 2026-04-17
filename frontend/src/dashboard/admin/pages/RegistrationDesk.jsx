import { useEffect, useState } from 'react';
import { FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';
import { api } from '../../../utils/api';

const RegistrationDesk = () => {
  const [participants, setParticipants] = useState([]);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const people = await api.get('/api/registrations');
        setParticipants((people || []).filter((p) => p.role === 'Participant').map((p) => ({
          ...p,
          affiliation: p.institution || '-',
          position: p.position || '-',
          interest: p.interest || '-',
          status: p.hasAttended ? 'Attended' : 'Registered',
        })));
        setApplicants((people || []).filter((p) => p.role === 'CommitteeApplicant').map((p) => ({
          ...p,
          expertise: p.expertise || '-',
          yearsExp: p.yearsExperience || '-',
          bio: p.bio || '-',
          status: p.status || 'pending',
        })));
      } catch (error) {
        alert(error.message);
      }
    };
    loadData();
  }, []);

  const updateParticipantStatus = async (id, newStatus) => {
    try {
      await api.patch(`/api/registrations/${id}`, { hasAttended: newStatus === 'Attended' });
      setParticipants(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    } catch (error) {
      alert(error.message);
    }
  };

  const sendParticipantConfirmation = (email, name) => {
    alert(`📧 Confirmation email sent to ${name} (${email}) – Welcome to SciConnect!`);
  };

  const sendApplicantConfirmation = (email, name) => {
    alert(`📧 Confirmation email sent to ${name} (${email}) – Your application has been received.`);
  };

  const handleCommitteeDecision = async (applicant, decision) => {
    if (decision === 'accept') {
      await api.patch(`/api/registrations/${applicant.id}`, { status: 'accepted' });
      setApplicants(prev => prev.filter(a => a.id !== applicant.id));
      alert(`✅ Accepted ${applicant.fullName}. Dashboard committee count will increase.`);
    } else {
      await api.patch(`/api/registrations/${applicant.id}`, { status: 'rejected' });
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