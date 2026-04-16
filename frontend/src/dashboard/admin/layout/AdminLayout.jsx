import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminRightSidebar from './AdminRightSidebar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../admin.css';

const AdminLayout = () => {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className={`admin-main ${!rightSidebarOpen ? 'full-width' : ''}`}>
        <Outlet />
      </main>
      <AdminRightSidebar isOpen={rightSidebarOpen} onClose={toggleRightSidebar} />
      <button
        className={`right-sidebar-toggle ${!rightSidebarOpen ? 'collapsed' : ''}`}
        onClick={toggleRightSidebar}
        title={rightSidebarOpen ? 'Close activity feed' : 'Open activity feed'}
      >
        {rightSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
    </div>
  );
};

export default AdminLayout;