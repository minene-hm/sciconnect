import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const mockStatus = {
  status: 'pending', 
  message: 'Your application is under review by the committee.',
  lastUpdated: '2026-03-15',
};

const StatusTracking = () => {
  const { status, message, lastUpdated } = mockStatus;

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