import React, { useState } from 'react';

const ActivitiesPlanner: React.FC = () => {
  const [activities, setActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState('');

  const addActivity = () => {
    setActivities([...activities, newActivity]);
    setNewActivity('');
  };

  return (
    <div className="activities-planner">
      <h2>Pianifica le attività</h2>
      <input 
        type="text" 
        value={newActivity} 
        onChange={(e) => setNewActivity(e.target.value)} 
        placeholder="Aggiungi un'attività"
      />
      <button onClick={addActivity}>Aggiungi</button>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesPlanner;
