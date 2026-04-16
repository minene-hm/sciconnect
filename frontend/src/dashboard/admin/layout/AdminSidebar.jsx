import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaFileAlt, FaCalendarAlt, FaCertificate, FaClipboardList, FaInbox, FaSignOutAlt } from 'react-icons/fa';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', label: 'Overview', icon: <FaTachometerAlt /> },
    { path: '/admin/speakers', label: 'Speaker Hub', icon: <FaUsers /> },
    { path: '/admin/submissions', label: 'Submission Center', icon: <FaFileAlt /> },
    { path: '/admin/agenda', label: 'Agenda Editor', icon: <FaCalendarAlt /> },
    { path: '/admin/certificates', label: 'Certificate Tool', icon: <FaCertificate /> },
    { path: '/admin/registration-desk', label: 'Registration Desk', icon: <FaClipboardList /> },
    { path: '/admin/support', label: 'Support Inbox', icon: <FaInbox /> },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">SciConnect Admin</div>
      <ul className="admin-sidebar-nav">
        {menuItems.map(item => (
          <li key={item.path}>
            <NavLink to={item.path} end>
              {item.icon} {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="admin-sidebar-footer">
        <button className="admin-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;