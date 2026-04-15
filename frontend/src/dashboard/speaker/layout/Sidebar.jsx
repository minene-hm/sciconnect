import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUpload,
  FaChartLine,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("speakerToken");
    localStorage.removeItem("speakerData");
    navigate("/");
  };

  const menuItems = [
    { path: "profile", label: "Profile", icon: <FaUser /> },
    { path: "submit-talk", label: "Submit Talk", icon: <FaUpload /> },
    { path: "status", label: "Status Tracking", icon: <FaChartLine /> },
    { path: "reports", label: "Reports", icon: <FaFileAlt /> },
  ];

  return (
    <aside className="speaker-sidebar">
      <div className="speaker-sidebar-logo">SciConnect</div>
      <ul className="speaker-sidebar-nav">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === "profile"}
              className={({ isActive }) =>
                isActive ? "speaker-sidebar-link active" : "speaker-sidebar-link"
              }
            >
              <span className="speaker-sidebar-icon">{item.icon}</span>
              <span className="speaker-sidebar-label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <button className="speaker-logout-button" onClick={handleLogout}>
        <span className="speaker-sidebar-icon"><FaSignOutAlt /></span>
        <span className="speaker-sidebar-label">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;