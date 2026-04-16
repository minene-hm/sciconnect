import { useState } from 'react';
import { FaEye, FaFilePdf, FaFilePowerpoint, FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const initialSubmissions = [
  { id: 1, title: 'Neural Architecture Search for Edge Devices', author: 'Prof. Khadidja Minasseri', theme: 'AI & Cognition', abstract: 'This paper presents a novel NAS method...', coAuthors: 'Dr. Amine Bouzid, Prof. Fatima Zohra', fileUrl: '#', fileType: 'pdf', date: '2026-03-10', status: 'Pending', reviewer: '' },
  { id: 2, title: 'Renewable Energy Forecasting using LSTM', author: 'Dr. Amine Bouzid', theme: 'Renewable Energy', abstract: 'We propose an LSTM-based model...', coAuthors: 'Prof. Khadidja Minasseri', fileUrl: '#', fileType: 'pptx', date: '2026-03-12', status: 'Under Review', reviewer: '' },
  { id: 3, title: 'Cybersecurity in Cloud Environments', author: 'Prof. Salah Bendjabo', theme: 'Cybersecurity', abstract: 'Analysis of cloud security threats...', coAuthors: '', fileUrl: '#', fileType: 'pdf', date: '2026-03-14', status: 'Accepted', reviewer: '' },
  { id: 4, title: 'Data Science for Healthcare', author: 'Dr. Fatima Zohra', theme: 'Health Technology', abstract: 'Using data science to improve patient outcomes...', coAuthors: 'Prof. Khadidja Minasseri', fileUrl: '#', fileType: 'pdf', date: '2026-03-15', status: 'Rejected', reviewer: '' },
];

const committeeMembers = ['Dr. Ahmed Benali', 'Prof. Samira Khelif', 'Dr. Nadia Ouali', 'Prof. Reda Bouzid'];

const statusOptions = ['Pending', 'Under Review', 'Accepted', 'Published', 'Rejected'];

const themes = ['AI & Cognition', 'Data Science', 'Cybersecurity', 'Renewable Energy', 'Health Technology'];

const SubmissionCenter = () => {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTheme, setFilterTheme] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAbstract, setCurrentAbstract] = useState(null);

  // Filter submissions
  const filteredSubmissions = submissions.filter(sub => {
    const matchSearch = sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        sub.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTheme = filterTheme ? sub.theme === filterTheme : true;
    return matchSearch && matchTheme;
  });

  const handleStatusChange = (id, newStatus) => {
    setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
    console.log(`Submission ${id} status updated to ${newStatus}`);
  };

  const handleReviewerChange = (id, reviewer) => {
    setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, reviewer } : sub));
    console.log(`Submission ${id} assigned to ${reviewer}`);
  };

  const bulkStatusUpdate = (newStatus) => {
    if (selectedRows.length === 0) return;
    setSubmissions(prev => prev.map(sub => 
      selectedRows.includes(sub.id) ? { ...sub, status: newStatus } : sub
    ));
    setSelectedRows([]);
    console.log(`Bulk updated ${selectedRows.length} submissions to ${newStatus}`);
  };

  const exportToCSV = () => {
    const exportData = filteredSubmissions.map(sub => ({
      ID: sub.id,
      'Paper Title': sub.title,
      Author: sub.author,
      Theme: sub.theme,
      'Submission Date': sub.date,
      Status: sub.status,
      Reviewer: sub.reviewer || 'Not assigned',
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Submissions');
    XLSX.writeFile(wb, `submissions_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const toggleSelectRow = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const selectAll = () => {
    if (selectedRows.length === filteredSubmissions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredSubmissions.map(s => s.id));
    }
  };

  const openAbstractModal = (submission) => {
    setCurrentAbstract(submission);
    setModalOpen(true);
  };

  return (
    <div className="submission-center">
      <div className="submission-header">
        <h2>Submission Center</h2>
        <div className="submission-actions-top">
          <button className="btn-export" onClick={exportToCSV}><FaDownload /> Export CSV</button>
        </div>
      </div>

      <div className="submission-filters">
        <input
          type="text"
          placeholder="Search by paper title or author..."
          className="submission-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="submission-filter" value={filterTheme} onChange={(e) => setFilterTheme(e.target.value)}>
          <option value="">All Themes</option>
          {themes.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {selectedRows.length > 0 && (
        <div className="bulk-actions-bar">
          <span>{selectedRows.length} selected</span>
          <select onChange={(e) => bulkStatusUpdate(e.target.value)} defaultValue="">
            <option value="" disabled>Bulk Update Status</option>
            {statusOptions.map(s => <option key={s}>{s}</option>)}
          </select>
          <button onClick={() => setSelectedRows([])}>Cancel</button>
        </div>
      )}

      <div className="submission-table-container">
        <table className="submission-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectedRows.length === filteredSubmissions.length && filteredSubmissions.length > 0} onChange={selectAll} /></th>
              <th>ID</th>
              <th>Paper Title</th>
              <th>Author</th>
              <th>Theme</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Assigned Reviewer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map(sub => (
              <tr key={sub.id}>
                <td><input type="checkbox" checked={selectedRows.includes(sub.id)} onChange={() => toggleSelectRow(sub.id)} /></td>
                <td>{sub.id}</td>
                <td className="paper-title">{sub.title}</td>
                <td>{sub.author}</td>
                <td>{sub.theme}</td>
                <td>{sub.date}</td>
                <td>
                  <select className="status-dropdown" value={sub.status} onChange={(e) => handleStatusChange(sub.id, e.target.value)}>
                    {statusOptions.map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td>
                  <select className="reviewer-dropdown" value={sub.reviewer} onChange={(e) => handleReviewerChange(sub.id, e.target.value)}>
                    <option value="">Unassigned</option>
                    {committeeMembers.map(m => <option key={m}>{m}</option>)}
                  </select>
                </td>
                <td>
                  <button className="view-abstract-btn" onClick={() => openAbstractModal(sub)}><FaEye /> Abstract</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && currentAbstract && (
        <div className="submission-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="submission-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{currentAbstract.title}</h3>
            <div className="modal-section">
              <strong>Author:</strong> {currentAbstract.author}
            </div>
            <div className="modal-section">
              <strong>Co‑Authors:</strong> {currentAbstract.coAuthors || 'None'}
            </div>
            <div className="modal-section">
              <strong>Abstract:</strong>
              <p>{currentAbstract.abstract}</p>
            </div>
            <div className="modal-section">
              <strong>Full Paper:</strong>
              <a href={currentAbstract.fileUrl} className="download-link" target="_blank" rel="noopener noreferrer">
                {currentAbstract.fileType === 'pdf' ? <FaFilePdf /> : <FaFilePowerpoint />} Download {currentAbstract.fileType.toUpperCase()}
              </a>
            </div>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionCenter;