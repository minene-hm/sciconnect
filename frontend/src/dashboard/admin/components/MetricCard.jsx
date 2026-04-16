const MetricCard = ({ title, value, icon, bgColor, borderColor, iconColor, titleColor }) => {
  return (
    <div 
      className="metric-card" 
      style={{ 
        backgroundColor: bgColor,
        borderTop: `4px solid ${borderColor}`,
      }}
    >
      <div className="metric-info">
        <h3 style={{ color: titleColor }}>{title}</h3>
        <div className="metric-number">{value}</div>
      </div>
      <div className="metric-icon" style={{ color: iconColor }}>
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;