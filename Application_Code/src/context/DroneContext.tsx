import React, { createContext, useContext, useState, useEffect } from 'react';

interface DroneState {
  battery: {
    percentage: number;
    temperature: number;
    voltage: number;
    current: number;
    cycles: number;
  };
  telemetry: {
    altitude: number;
    speed: number;
    gpsSignal: number;
    latitude: number;
    longitude: number;
  };
  system: {
    temperature: number;
    motorRpm: number[];
    connectionQuality: number;
    flightMode: string;
    firmwareVersion: string;
  };
}

interface DroneContextType {
  droneState: DroneState;
  updateDroneState: (newState: Partial<DroneState>) => void;
  connectDrone: () => void;
  disconnectDrone: () => void;
  isConnected: boolean;
}

const initialDroneState: DroneState = {
  battery: {
    percentage: 87,
    temperature: 32,
    voltage: 11.8,
    current: 2.4,
    cycles: 124,
  },
  telemetry: {
    altitude: 128,
    speed: 12,
    gpsSignal: 95,
    latitude: 48.8584,
    longitude: 2.2945,
  },
  system: {
    temperature: 42,
    motorRpm: [5400, 5380, 5420, 5390],
    connectionQuality: 98,
    flightMode: 'Sport',
    firmwareVersion: 'v2.1.4',
  },
};

const DroneContext = createContext<DroneContextType | undefined>(undefined);

export const DroneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [droneState, setDroneState] = useState<DroneState>(initialDroneState);
  const [isConnected, setIsConnected] = useState(false);
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null);

  const updateDroneState = (newState: Partial<DroneState>) => {
    setDroneState(prevState => ({
      ...prevState,
      ...newState,
    }));
  };

  const simulateHardwareUpdates = () => {
    // Simulate battery drain
    updateDroneState({
      battery: {
        ...droneState.battery,
        percentage: Math.max(0, droneState.battery.percentage - 0.01),
        temperature: 32 + Math.random() * 2,
        current: 2.4 + Math.random() * 0.2,
      },
      telemetry: {
        ...droneState.telemetry,
        altitude: 128 + Math.sin(Date.now() / 1000) * 5,
        speed: 12 + Math.random() * 2,
      },
      system: {
        ...droneState.system,
        motorRpm: droneState.system.motorRpm.map(rpm => rpm + (Math.random() * 40 - 20)),
        temperature: 42 + Math.random(),
      },
    });
  };

  const connectDrone = () => {
    setIsConnected(true);
    const interval = setInterval(simulateHardwareUpdates, 1000);
    setSimulationInterval(interval);
  };

  const disconnectDrone = () => {
    setIsConnected(false);
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
  };

  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, []);

  return (
    <DroneContext.Provider value={{
      droneState,
      updateDroneState,
      connectDrone,
      disconnectDrone,
      isConnected,
    }}>
      {children}
    </DroneContext.Provider>
  );
};

export const useDrone = () => {
  const context = useContext(DroneContext);
  if (context === undefined) {
    throw new Error('useDrone must be used within a DroneProvider');
  }
  return context;
};