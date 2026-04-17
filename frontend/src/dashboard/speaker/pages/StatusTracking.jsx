import { useEffect, useState } from 'react';
import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { api } from '../../../utils/api';

const StatusTracking = () => {
  const [statusData, setStatusData] = useState({
    status: 'pending',
    message: 'Your application is under review by the committee.',
    lastUpdated: '',
  });

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const savedSpeaker = JSON.parse(localStorage.getItem('speakerData') || '{}');
        if (!savedSpeaker.email) return;
        const paper = await api.get(`/api/track-paper/${savedSpeaker.email}`);
        setStatusData({
          status: (paper.status || 'Pending').toLowerCase(),
          message: `Current decision: ${paper.status || 'Pending'}.`,
          lastUpdated: paper.updatedAt ? paper.updatedAt.slice(0, 10) : '',
        });
      } catch (error) {
        // Keep fallback text when no submission exists.
      }
    };
    loadStatus();
  }, []);

  const { status, message, lastUpdated } = statusData;

  const getStatusConfig = () => {
    switch(status) {
      case 'accepted':
        return { text: 'Accepted', icon: <FaCheckCircle size={40} color="#2ecc71" />, class: 'status-accepted' };
      case 'rejected':
        return { text: 'Rejected', icon: <FaTimesCircle size={40} color="#e74c3c" />, class: 'status-rejected' };
      default:
        return { text: 'Pending', icon: <FaClock size={40} color="#f39c12" />, class: 'status-pending' };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="dashboard-card">
      <h2>Application Status</h2>
      <div className="status-card">
        {config.icon}
        <div className={`status-badge ${config.class}`}>{config.text}</div>
        <p style={{ marginTop: '1rem', color: '#333' }}>{message}</p>
        <p style={{ fontSize: '0.85rem', color: '#666' }}>Last updated: {lastUpdated}</p>
      </div>
    </div>
  );
};

export default StatusTracking;