import React from 'react';
import { Battery, Cpu, Gauge, Navigation, Radio, RotateCw, Signal, Thermometer, Wind } from 'lucide-react';
import BatteryChart from './components/BatteryChart';
import DroneStatus from './components/DroneStatus';
import MetricsCard from './components/MetricsCard';
import NavigationMap from './components/NavigationMap';
import { useDrone } from './context/DroneContext';

function App() {
  const { droneState, isConnected, connectDrone, disconnectDrone } = useDrone();

  const handleToggleConnection = () => {
    if (isConnected) {
      disconnectDrone();
    } else {
      connectDrone();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2 shadow-lg shadow-blue-600/20">
                <Radio className="h-8 w-8 text-white" />
              </div>
                    <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">DragonSkyRobotics</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Signal className={`h-5 w-5 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-sm font-medium ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <button
                onClick={handleToggleConnection}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg ${
                  isConnected
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                }`}
              >
                {isConnected ? 'Disconnect Drone' : 'Connect Drone'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
                <div className="flex items-center space-x-2">
                  <Battery className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-slate-600">Battery</span>
                </div>
                <p className="text-2xl font-bold mt-2">{droneState.battery.percentage.toFixed(1)}%</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
                <div className="flex items-center space-x-2">
                  <Gauge className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-slate-600">Altitude</span>
                </div>
                <p className="text-2xl font-bold mt-2">{droneState.telemetry.altitude.toFixed(0)}m</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
                <div className="flex items-center space-x-2">
                  <Wind className="h-5 w-5 text-teal-600" />
                  <span className="text-sm text-slate-600">Speed</span>
                </div>
                <p className="text-2xl font-bold mt-2">{droneState.telemetry.speed.toFixed(1)}km/h</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-slate-600">Temp</span>
                </div>
                <p className="text-2xl font-bold mt-2">{droneState.battery.temperature.toFixed(1)}°C</p>
              </div>
            </div>

            {/* Drone Status */}
            <DroneStatus />

            {/* Navigation Map */}
            <NavigationMap />

            {/* Battery Analytics */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-lg font-semibold mb-4">Battery Performance</h2>
              <BatteryChart />
            </div>
          </div>

          {/* Right Column - Metrics */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
              <h2 className="text-lg font-semibold mb-4">System Metrics</h2>
              <div className="space-y-4">
                <MetricsCard
                  icon={<Battery className="h-6 w-6 text-blue-600" />}
                  title="Battery Status"
                  value={`${droneState.battery.percentage.toFixed(1)}%`}
                  subtitle={`${droneState.battery.voltage.toFixed(1)}V / ${droneState.battery.current.toFixed(1)}A`}
                />
                <MetricsCard
                  icon={<Thermometer className="h-6 w-6 text-orange-600" />}
                  title="Temperature"
                  value={`${droneState.battery.temperature.toFixed(1)}°C`}
                  subtitle="Operating normal"
                />
                <MetricsCard
                  icon={<Wind className="h-6 w-6 text-teal-600" />}
                  title="Wind Speed"
                  value={`${droneState.telemetry.speed.toFixed(1)} km/h`}
                  subtitle="Safe flying conditions"
                />
                <MetricsCard
                  icon={<Gauge className="h-6 w-6 text-purple-600" />}
                  title="Altitude"
                  value={`${droneState.telemetry.altitude.toFixed(1)}m`}
                  subtitle="Max height: 500m"
                />
                <MetricsCard
                  icon={<RotateCw className="h-6 w-6 text-indigo-600" />}
                  title="Motor RPM"
                  value={`${Math.round(droneState.system.motorRpm[0])}`}
                  subtitle="All motors nominal"
                />
                <MetricsCard
                  icon={<Cpu className="h-6 w-6 text-red-600" />}
                  title="System Health"
                  value={`${droneState.system.connectionQuality}%`}
                  subtitle="All systems operational"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;