import React from 'react';

interface MetricsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ icon, title, value, subtitle }) => {
  return (
    <div className="bg-slate-50 rounded-lg p-4 transition-all duration-300 hover:bg-slate-100">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-slate-600">{title}</h3>
          <p className="text-xl font-semibold text-slate-900">{value}</p>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;