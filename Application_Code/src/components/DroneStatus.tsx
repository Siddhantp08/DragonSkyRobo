import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useDrone } from '../context/DroneContext';

const DroneStatus: React.FC = () => {
  const { droneState, isConnected } = useDrone();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Drone Status</h2>
        <div className="flex items-center space-x-2">
          <Shield className={`h-5 w-5 ${isConnected ? 'text-green-500' : 'text-gray-400'}`} />
          <span className={`text-sm font-medium ${isConnected ? 'text-green-500' : 'text-gray-400'}`}>
            {isConnected ? 'System Protected' : 'System Offline'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className={`h-5 w-5 ${droneState.telemetry.gpsSignal > 80 ? 'text-green-500' : 'text-yellow-500'}`} />
              <span className="text-sm text-gray-600">GPS Signal</span>
            </div>
            <span className={`text-sm font-medium ${droneState.telemetry.gpsSignal > 80 ? 'text-green-500' : 'text-yellow-500'}`}>
              {droneState.telemetry.gpsSignal > 80 ? 'Strong' : 'Moderate'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className={`h-5 w-5 ${droneState.system.connectionQuality > 90 ? 'text-green-500' : 'text-yellow-500'}`} />
              <span className="text-sm text-gray-600">Connection Quality</span>
            </div>
            <span className={`text-sm font-medium ${droneState.system.connectionQuality > 90 ? 'text-green-500' : 'text-yellow-500'}`}>
              {droneState.system.connectionQuality > 90 ? 'Excellent' : 'Good'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">Flight Mode</span>
            </div>
            <span className="text-sm font-medium text-blue-600">{droneState.system.flightMode}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className={`h-5 w-5 ${droneState.battery.percentage > 20 ? 'text-green-500' : 'text-red-500'}`} />
              <span className="text-sm text-gray-600">Battery Health</span>
            </div>
            <span className={`text-sm font-medium ${droneState.battery.percentage > 20 ? 'text-green-500' : 'text-red-500'}`}>
              {droneState.battery.percentage > 20 ? 'Optimal' : 'Low'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">Last Maintenance</span>
            </div>
            <span className="text-sm font-medium">2 days ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">Firmware</span>
            </div>
            <span className="text-sm font-medium">{droneState.system.firmwareVersion} (Latest)</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-center space-x-3">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <p className="text-sm text-amber-700">Scheduled maintenance recommended in 5 days</p>
      </div>
    </div>
  );
};

export default DroneStatus;