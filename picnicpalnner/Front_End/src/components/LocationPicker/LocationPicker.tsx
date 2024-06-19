import React, { useState } from 'react';
import './LocationPicker.css';

const LocationPicker: React.FC = () => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className="location-picker">
      <h2>Seleziona la location</h2>
      <input 
        type="text" 
        value={location} 
        onChange={handleLocationChange} 
        placeholder="Inserisci la location"
      />
    </div>
  );
};

export default LocationPicker;
