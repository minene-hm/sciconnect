import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'AI & Cognition', value: 35 },
  { name: 'Data Science', value: 28 },
  { name: 'Cybersecurity', value: 18 },
  { name: 'Renewable Energy', value: 22 },
  { name: 'Health Technology', value: 15 },
];

const COLORS = ['#8b5cf6', '#a78bfa', '#c084fc', '#e879f9', '#f0abfc'];

const TrackDistributionChart = () => {
  return (
    <div className="chart-card">
      <h3 className="chart-title">Track Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrackDistributionChart;