import React from 'react';
import { useDrone } from '../context/DroneContext';

const BatteryChart: React.FC = () => {
  const { droneState } = useDrone();
  const { battery } = droneState;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="w-full sm:w-auto">
          <div className="h-3 w-full sm:w-64 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                battery.percentage > 50
                  ? 'bg-gradient-to-r from-green-500 to-green-400'
                  : battery.percentage > 20
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                  : 'bg-gradient-to-r from-red-500 to-red-400'
              }`}
              style={{ width: `${battery.percentage}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-slate-500">0%</span>
            <span className="text-slate-500">50%</span>
            <span className="text-slate-500">100%</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-slate-900">{battery.percentage.toFixed(1)}%</p>
          <p className="text-sm text-slate-500">Current Charge</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Estimated Flight Time</span>
            <span className="text-sm font-medium text-slate-900">
              {(battery.percentage * 0.03).toFixed(1)} hours
            </span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Power Consumption</span>
            <span className="text-sm font-medium text-slate-900">
              {(battery.voltage * battery.current).toFixed(1)} W
            </span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Battery Temperature</span>
            <span className="text-sm font-medium text-slate-900">{battery.temperature.toFixed(1)}°C</span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Charge Cycles</span>
            <span className="text-sm font-medium text-slate-900">{battery.cycles} cycles</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <h3 className="text-sm font-medium mb-4">Battery Health Tips</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">Maintain battery temperature below 35°C</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">Avoid complete discharge</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">Store at 40-60% charge when not in use</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryChart;