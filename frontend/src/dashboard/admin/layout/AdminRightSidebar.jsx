import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { api } from '../../../utils/api';

const AdminRightSidebar = ({ isOpen, onClose }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const result = await api.get('/api/activity-log');
        if (Array.isArray(result)) {
          setActivities(result);
        }
      } catch (error) {
        console.error('Failed to load activity log', error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <aside className={`admin-right-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="right-sidebar-header">
        <h3 className="activity-feed-title">Live Audit Log</h3>
        <button className="close-sidebar-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <ul className="activity-list">
        {loading ? (
          <li className="activity-item activity-loading">Loading activity log...</li>
        ) : activities.length > 0 ? (
          activities.map(act => (
            <li key={act.id} className="activity-item">
              <div>{act.text}</div>
              <div className="activity-time">{act.time}</div>
            </li>
          ))
        ) : (
          <li className="activity-item activity-empty">
            No activity items are available right now.
          </li>
        )}
      </ul>
    </aside>
  );
};

export default AdminRightSidebar;