import React, { useState } from 'react';

const EventForm: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event Name:', eventName);
    console.log('Event Date:', eventDate);
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>Crea un nuovo evento</h2>
      <div>
        <label>Nome dell'evento:</label>
        <input 
          type="text" 
          value={eventName} 
          onChange={(e) => setEventName(e.target.value)} 
        />
      </div>
      <div>
        <label>Data dell'evento:</label>
        <input 
          type="date" 
          value={eventDate} 
          onChange={(e) => setEventDate(e.target.value)} 
        />
      </div>
      <button type="submit">Crea evento</button>
    </form>
  );
};

export default EventForm;
