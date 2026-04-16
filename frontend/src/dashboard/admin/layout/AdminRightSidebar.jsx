import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const mockActivities = [
  { id: 1, text: 'New registration: Dr. Amine Bouzid (University of Algiers)', time: '2 min ago' },
  { id: 2, text: 'Paper status updated: "Neural Architecture Search" is now Accepted', time: '15 min ago' },
  { id: 3, text: 'Speaker verified: Prof. Khadidja Minasseri', time: '1 hour ago' },
  { id: 4, text: 'New submission: "AI in Renewable Energy"', time: '3 hours ago' },
];

const AdminRightSidebar = ({ isOpen, onClose }) => {
  const [activities, setActivities] = useState(mockActivities);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        text: `System update: ${Math.random() > 0.5 ? 'Paper reviewed' : 'New speaker registered'}`,
        time: 'Just now',
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 15000);
    return () => clearInterval(interval);
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
        {activities.map(act => (
          <li key={act.id} className="activity-item">
            <div>{act.text}</div>
            <div className="activity-time">{act.time}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminRightSidebar;