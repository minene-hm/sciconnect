import { useState } from 'react';

const initialSubmissions = [
  { id: 1, author: 'Prof. Khadidja Minasseri', title: 'Neural Architecture Search for Edge Devices', category: 'AI & Cognition', file: 'paper1.pdf', status: 'Accepted' },
  { id: 2, author: 'Dr. Amine Bouzid', title: 'Renewable Energy Forecasting using LSTM', category: 'Renewable Energy', file: 'paper2.pptx', status: 'Under Review' },
  { id: 3, author: 'Prof. Salah Bendjabo', title: 'Cybersecurity in Cloud Environments', category: 'Cybersecurity', file: 'paper3.pdf', status: 'Pending' },
  { id: 4, author: 'Dr. Fatima Zohra', title: 'Data Science for Healthcare', category: 'Health Technology', file: 'paper4.pptx', status: 'Rejected' },
];

const SubmissionsTable = () => {
  const [submissions, setSubmissions] = useState(initialSubmissions);

  const handleStatusChange = (id, newStatus) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, status: newStatus } : sub
      )
    );
    console.log(`Paper ${id} status updated to ${newStatus}`);
    const activity = {
      id: Date.now(),
      text: `Paper "${submissions.find(s => s.id === id)?.title}" status changed to ${newStatus}`,
      time: 'Just now',
    };
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