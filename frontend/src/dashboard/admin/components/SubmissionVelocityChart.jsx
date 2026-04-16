import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', submissions: 12, accepted: 4 },
  { month: 'Feb', submissions: 19, accepted: 7 },
  { month: 'Mar', submissions: 27, accepted: 12 },
  { month: 'Apr', submissions: 35, accepted: 18 },
  { month: 'May', submissions: 48, accepted: 24 },
  { month: 'Jun', submissions: 62, accepted: 31 },
];

const SubmissionVelocityChart = () => {
  return (
    <div className="chart-card">
      <h3 className="chart-title">Submission Velocity</h3>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradientSubmissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="gradientAccepted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF52A0" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#FFB2B2" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fill: '#4a5568' }} />
          <YAxis tick={{ fill: '#4a5568' }} />
          <Tooltip
            contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="submissions"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#gradientSubmissions)"
            name="Total Submissions"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="accepted"
            stroke="#FF52A0"
            strokeWidth={2}
            fill="url(#gradientAccepted)"
            name="Accepted Papers"
            stackId="2"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubmissionVelocityChart;