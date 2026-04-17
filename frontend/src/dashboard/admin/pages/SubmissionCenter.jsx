import { useEffect, useState } from 'react';
import { FaEye, FaFilePdf, FaFilePowerpoint, FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { api } from '../../../utils/api';

const committeeMembers = ['Dr. Ahmed Benali', 'Prof. Samira Khelif', 'Dr. Nadia Ouali', 'Prof. Reda Bouzid'];

const statusOptions = ['Pending', 'Under Review', 'Accepted', 'Published', 'Rejected'];

const themes = ['AI & Cognition', 'Data Science', 'Cybersecurity', 'Renewable Energy', 'Health Technology'];

const SubmissionCenter = () => {
  const [submissions, setSubmissions] = useState([]);
  const normalizeSubmission = (sub) => ({
    id: sub.id,
    title: sub.paperTitle || sub.title || 'Untitled',
    author: sub.authors?.[0]?.name || 'Unknown author',
    authorEmail: sub.authors?.[0]?.email || '',
    theme: sub.track || sub.theme || 'General',
    abstract: sub.abstract || '',
    coAuthors: (sub.authors || []).slice(1).map((a) => a.name).join(', '),
    fileUrl: '#',
    fileType: (sub.fileName || '').toLowerCase().endsWith('pptx') ? 'pptx' : 'pdf',
    date: (sub.createdAt || new Date().toISOString()).slice(0, 10),
    status: sub.status || 'Pending',
    reviewer: sub.reviewer || '',
  });

  const loadSubmissions = async () => {
    try {
      const data = await api.get('/api/submissions');
      setSubmissions((data || []).map(normalizeSubmission));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/api/submissions/${id}`, { status: newStatus });
      setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleReviewerChange = async (id, reviewer) => {
    try {
      await api.patch(`/api/submissions/${id}`, { reviewer });
      setSubmissions(prev => prev.map(sub => sub.id === id ? { ...sub, reviewer } : sub));
    } catch (error) {
      alert(error.message);
    }
  };

  const bulkStatusUpdate = async (newStatus) => {
    if (selectedRows.length === 0) return;
    await Promise.all(selectedRows.map((id) => api.patch(`/api/submissions/${id}`, { status: newStatus })));
    setSubmissions(prev => prev.map(sub => (selectedRows.includes(sub.id) ? { ...sub, status: newStatus } : sub)));
    setSelectedRows([]);
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