import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../speaker.css';

const SpeakerLayout = () => {
  return (
    <div className="speaker-dashboard">
      <Sidebar />
      <main className="speaker-main">
        <Outlet />
      </main>
    </div>
  );
};

export default SpeakerLayout;