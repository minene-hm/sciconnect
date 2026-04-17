import { useEffect, useState } from 'react';
import { FaUsers, FaFileAlt, FaMicrophoneAlt, FaUserTie } from 'react-icons/fa';
import MetricCard from '../components/MetricCard';
import SubmissionVelocityChart from '../components/SubmissionVelocityChart';
import TrackDistributionChart from '../components/TrackDistributionChart';
import SubmissionsTable from '../components/SubmissionsTable';
import { api } from '../../../utils/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalParticipants: 0,
    papersSubmitted: 0,
    verifiedSpeakers: 0,
    committeeMembers: 0,
  });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const [registrations, submissions, speakers] = await Promise.all([
          api.get('/api/registrations'),
          api.get('/api/submissions'),
          api.get('/api/speakers'),
        ]);
        setMetrics({
          totalParticipants: (registrations || []).filter((r) => r.role === 'Participant').length,
          papersSubmitted: (submissions || []).length,
          verifiedSpeakers: (speakers || []).length,
          committeeMembers: (registrations || []).filter((r) => r.role === 'CommitteeApplicant' && r.status === 'accepted').length,
        });
      } catch (error) {
        // Keep zeroed metrics if API fails.
      }
    };
    loadMetrics();
  }, []);

  return (
    <div>
      <div className="metric-grid">
        <MetricCard 
          title="Total Participants" 
          value={metrics.totalParticipants} 
          icon={<FaUsers />} 
          bgColor="#E6D6E3"      
          borderColor="#612D53"  
          iconColor="#612D53"
          titleColor="#000"
        />
        <MetricCard 
          title="Papers Submitted" 
          value={metrics.papersSubmitted} 
          icon={<FaFileAlt />} 
          bgColor="#FFD8DF"      
          borderColor="#CA6180"  
          iconColor="#CA6180"
          titleColor="#000"
        />
        <MetricCard 
          title="Verified Speakers" 
          value={metrics.verifiedSpeakers} 
          icon={<FaMicrophoneAlt />} 
          bgColor="#BDE8F5"      
          borderColor="#30364F" 
          iconColor="#30364F"
          titleColor="#000"
        />
        <MetricCard 
          title="Scientific Committee" 
          value={metrics.committeeMembers} 
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