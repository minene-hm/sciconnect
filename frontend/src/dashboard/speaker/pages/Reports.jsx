import { useEffect, useState } from 'react';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import { api } from '../../../utils/api';

const Reports = () => {
  const [report, setReport] = useState({
    fileName: 'No report available yet',
    url: '#',
    available: false,
  });

  useEffect(() => {
    const loadReport = async () => {
      try {
        const savedSpeaker = JSON.parse(localStorage.getItem('speakerData') || '{}');
        if (!savedSpeaker.email) return;
        const result = await api.get(`/api/reports/${savedSpeaker.email}`);
        if (result.available) setReport(result);
      } catch (error) {
        // Keep fallback.
      }
    };
    loadReport();
  }, []);

  const handleDownload = () => {
    if (!report.available) {
      alert('No report available yet.');
      return;
    }
    window.open(report.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="dashboard-card">
      <h2>Final Report</h2>
      <div className="report-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <FaFilePdf size={32} color="#e74c3c" />
          <span>{report.fileName}</span>
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