import { FaUsers, FaFileAlt, FaMicrophoneAlt, FaUserTie } from 'react-icons/fa';
import MetricCard from '../components/MetricCard';
import SubmissionVelocityChart from '../components/SubmissionVelocityChart';
import TrackDistributionChart from '../components/TrackDistributionChart';
import SubmissionsTable from '../components/SubmissionsTable';

const totalParticipants = 245;
const papersSubmitted = 62;
const verifiedSpeakers = 28;
const committeeMembers = 15;

const Dashboard = () => {
  return (
    <div>
      <div className="metric-grid">
        <MetricCard 
          title="Total Participants" 
          value={totalParticipants} 
          icon={<FaUsers />} 
          bgColor="#E6D6E3"      
          borderColor="#612D53"  
          iconColor="#612D53"
          titleColor="#000"
        />
        <MetricCard 
          title="Papers Submitted" 
          value={papersSubmitted} 
          icon={<FaFileAlt />} 
          bgColor="#FFD8DF"      
          borderColor="#CA6180"  
          iconColor="#CA6180"
          titleColor="#000"
        />
        <MetricCard 
          title="Verified Speakers" 
          value={verifiedSpeakers} 
          icon={<FaMicrophoneAlt />} 
          bgColor="#BDE8F5"      
          borderColor="#30364F" 
          iconColor="#30364F"
          titleColor="#000"
        />
        <MetricCard 
          title="Scientific Committee" 
          value={committeeMembers} 
          icon={<FaUserTie />} 
          bgColor="#FFFDE1"     
          borderColor="#EEA727" 
          iconColor="#EEA727"
          titleColor="#000"
        />
      </div>

      <div className="charts-row">
        <SubmissionVelocityChart />
        <TrackDistributionChart />
      </div>

      <SubmissionsTable />
    </div>
  );
};

export default Dashboard;