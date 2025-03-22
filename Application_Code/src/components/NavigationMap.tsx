import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Compass, Home } from 'lucide-react';
import { useDrone } from '../context/DroneContext';

const NavigationMap: React.FC = () => {
  const { droneState, updateDroneState } = useDrone();
  const { telemetry } = droneState;
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // Update drone state with user's location
          updateDroneState({
            telemetry: {
              ...telemetry,
              latitude: latitude,
              longitude: longitude
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Calculate the map URL with the correct location
  const mapUrl = userLocation 
    ? `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${userLocation.lng},${userLocation.lat},13,0/800x400@2x?access_token=pk.eyJ1IjoiZHJvbmVtYXAiLCJhIjoiY2xtN2E1Z3k2MGJjbTNkbW9xbTBlbTh2dyJ9.JwBxpgQemXXp3aRyoJ8zrA`
    : 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold">Live Navigation</h2>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">Live</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium">Set Home</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Navigation className="h-4 w-4" />
            <span className="text-sm font-medium">Return Home</span>
          </button>
        </div>
      </div>

      <div className="relative h-[400px] bg-slate-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('${mapUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.9)'
        }} />
        
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Navigation className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Current Location</p>
              <p className="text-xs text-slate-600">
                {telemetry.latitude.toFixed(6)}° {telemetry.latitude >= 0 ? 'N' : 'S'}, 
                {telemetry.longitude.toFixed(6)}° {telemetry.longitude >= 0 ? 'E' : 'W'}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2 hover:bg-slate-100 rounded transition-colors" title="Mark Location">
              <MapPin className="h-5 w-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded transition-colors" title="Center Map">
              <Navigation className="h-5 w-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded transition-colors" title="Toggle Compass">
              <Compass className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Drone marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
            <div className="absolute -inset-2 border-2 border-blue-600 rounded-full animate-ping opacity-20" />
          </div>
        </div>
      </div>

      {/* Additional navigation info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-50 p-3 rounded-lg">
          <p className="text-sm text-slate-600">Altitude</p>
          <p className="text-lg font-semibold">{telemetry.altitude.toFixed(1)}m</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg">
          <p className="text-sm text-slate-600">Ground Speed</p>
          <p className="text-lg font-semibold">{telemetry.speed.toFixed(1)} km/h</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg">
          <p className="text-sm text-slate-600">GPS Signal</p>
          <p className="text-lg font-semibold">{telemetry.gpsSignal}%</p>
        </div>
      </div>
    </div>
  );
};

export default NavigationMap;