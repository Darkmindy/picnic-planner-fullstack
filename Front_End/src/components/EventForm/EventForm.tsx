import React, { useState } from 'react';
import './EventForm.css';
import { createEvent, EventData } from 'api/eventApi'; // Assumendo che tu abbia una funzione createEvent
import { useAuth } from 'services/AuthContext';

const EventForm: React.FC = () => {
  const [title, setEventTitle] = useState('');
  const [description, setEventDescription] = useState('');
  const [location, setEventLocation] = useState('');
  const [date, setEventDate] = useState('');

  const { accessToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData: EventData = { title, description, location, date };

    try {
      if (!accessToken) {
        throw new Error('Access token not available');
      }

      const result = await createEvent(accessToken, eventData); // Utilizzo della funzione API createEvent
      console.log('Event created:', result);

      console.log('Event Name:', title);
      console.log('Event Date:', date);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>Crea un nuovo evento</h2>
      <div>
        <label>Nome dell'evento:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setEventTitle(e.target.value)} 
        />
      </div>
      <div>
        <label>Descrizione dell'evento:</label>
        <textarea 
          value={description} 
          onChange={(e) => setEventDescription(e.target.value)} 
        />
      </div>
      <div>
        <label>Luogo dell'evento:</label>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setEventLocation(e.target.value)} 
        />
      </div>
      <div>
        <label>Data dell'evento:</label>
        <input 
          type="text" 
          value={date} 
          onChange={(e) => setEventDate(e.target.value)} 
        />
      </div>
      <button type="submit">Crea evento</button>
    </form>
  );
};

export default EventForm;
