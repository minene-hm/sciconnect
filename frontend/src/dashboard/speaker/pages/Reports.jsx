import { FaFilePdf, FaDownload } from 'react-icons/fa';

const mockReport = {
  fileName: 'final_report_minene_Hm.pdf',
  url: '#',
};

const Reports = () => {
  const handleDownload = () => {
    alert(`Mock download: ${mockReport.fileName}`);
  };

  return (
    <div className="dashboard-card">
      <h2>Final Report</h2>
      <div className="report-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaFilePdf size={32} color="#e74c3c" />
          <span>{mockReport.fileName}</span>
        </div>
        <button className="btn-primary" onClick={handleDownload}>
          <FaDownload /> Download
        </button>
      </div>
      <p style={{ marginTop: '1rem', color: '#555' }}>Your session feedback and certificate will be available after the conference.</p>
    </div>
  );
};

export default Reports;