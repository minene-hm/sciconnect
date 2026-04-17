import { useEffect, useState } from 'react';
import { api } from '../../../utils/api';

const SubmissionsTable = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const data = await api.get('/api/submissions');
        setSubmissions(
          (data || []).map((sub) => ({
            id: sub.id,
            author: sub.authors?.[0]?.name || 'Unknown',
            title: sub.paperTitle || 'Untitled',
            category: sub.track || 'General',
            file: sub.fileName || 'paper.pdf',
            status: sub.status || 'Pending',
          }))
        );
      } catch (error) {
        // Keep empty table on error.
      }
    };
    loadSubmissions();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/api/submissions/${id}`, { status: newStatus });
      setSubmissions(prev => prev.map(sub => (sub.id === id ? { ...sub, status: newStatus } : sub)));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDownload = (fileName) => {
    alert(`Downloading: ${fileName}`);
  };

  return (
    <div className="table-container">
      <h3 className="chart-title" style={{ marginBottom: '1rem' }}>Submission Management</h3>
      <table className="submissions-table">
        <thead>
          <tr>
            <th>Author / Speaker</th>
            <th>Paper Title</th>
            <th>Category</th>
            <th>Submission File</th>
            <th>Status Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(sub => (
            <tr key={sub.id}>
              <td>{sub.author}</td>
              <td>{sub.title}</td>
              <td>{sub.category}</td>
              <td>
                <button className="download-btn" onClick={() => handleDownload(sub.file)}>
                  Download {sub.file.split('.').pop().toUpperCase()}
                </button>
              </td>
              <td>
                <select
                  className="status-dropdown"
                  value={sub.status}
                  onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Under Review</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsTable;