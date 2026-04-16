import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaUpload, FaEnvelope, FaDownload, FaFilePdf } from 'react-icons/fa';

const initialUsers = [
  { id: 1, name: 'Abdellah Benmoussa', email: 'abdou@example.com', role: 'Speaker', isVerified: false },
  { id: 2, name: 'Iyad Mirali', email: 'iyad@example.com', role: 'Participant', isVerified: true },
  { id: 3, name: 'Prof. Ahmed Benali', email: 'ahmed@univ.dz', role: 'Committee', isVerified: false },
  { id: 4, name: 'Dr. Fatima Zohra', email: 'fatima@lab.dz', role: 'Speaker', isVerified: true },
];

const CertificateTool = () => {
  const [users, setUsers] = useState(initialUsers);
  const [templateType, setTemplateType] = useState('Speaker');
  const [signature, setSignature] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [reportTarget, setReportTarget] = useState('All');
  const [reportUploaded, setReportUploaded] = useState(false);

  const toggleVerification = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isVerified: !u.isVerified } : u));
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSignature(URL.createObjectURL(file));
  };

  const handleReportUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReportFile(file);
      setReportUploaded(true);
      alert(`Report "${file.name}" uploaded for ${reportTarget}`);
    }
  };

  const emailAllCertificates = () => {
    const verifiedUsers = users.filter(u => u.isVerified);
    if (verifiedUsers.length === 0) {
      alert('No verified users to email.');
      return;
    }
    alert(`Sending certificates to ${verifiedUsers.length} verified users (simulated).`);
  };

  const bulkDownload = () => {
    const verifiedUsers = users.filter(u => u.isVerified);
    if (verifiedUsers.length === 0) {
      alert('No verified users to download.');
      return;
    }
    alert(`Downloading ${verifiedUsers.length} certificates as ZIP (simulated).`);
  };

  return (
    <div className="certificate-tool">
      <h2>Certificate Tool</h2>

      <div className="cert-section">
        <h3>Verification List (Gatekeeper)</h3>
        <div className="cert-table-container">
          <table className="cert-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Role</th><th>Verified</th><th>Action</th></tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isVerified ? <FaCheckCircle color="#2ecc71" /> : <FaTimesCircle color="#e74c3c" />}</td>
                  <td>
                    <label className="verify-toggle">
                      <input type="checkbox" checked={user.isVerified} onChange={() => toggleVerification(user.id)} />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cert-section">
        <h3>Certificate Template Customization</h3>
        <div className="cert-form-row">
          <div className="form-group">
            <label>Template Type</label>
            <select value={templateType} onChange={(e) => setTemplateType(e.target.value)}>
              <option>Speaker Certificate</option>
              <option>Participant Certificate</option>
              <option>Scientific Committee Certificate</option>
            </select>
          </div>
          <div className="form-group">
            <label>Signature Upload (Chair/Rector)</label>
            <input type="file" accept="image/*" onChange={handleSignatureUpload} />
            {signature && <img src={signature} alt="Signature preview" className="signature-preview" />}
          </div>
        </div>
      </div>

      <div className="cert-section">
        <h3>Bulk Actions</h3>
        <div className="bulk-actions">
          <button className="btn-bulk" onClick={emailAllCertificates}><FaEnvelope /> Email All Certificates</button>
          <button className="btn-bulk" onClick={bulkDownload}><FaDownload /> Bulk Download (ZIP)</button>
        </div>
      </div>

      <div className="cert-section">
        <h3>Final Report Management</h3>
        <div className="report-upload">
          <div className="form-group">
            <label>Target Audience</label>
            <select value={reportTarget} onChange={(e) => setReportTarget(e.target.value)}>
              <option>All</option>
              <option>Only Speakers</option>
              <option>Only Committee</option>
            </select>
          </div>
          <div className="form-group">
            <label>Upload Report (PDF)</label>
            <input type="file" accept=".pdf" onChange={handleReportUpload} />
          </div>
          {reportUploaded && (
            <div className="report-status">
              <FaFilePdf /> Report uploaded for <strong>{reportTarget}</strong>. It will appear in the Reports page of those users.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateTool;