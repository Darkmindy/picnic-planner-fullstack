import React, { useState } from 'react';
import './ActivitiesPlanner.css';

const ActivitiesPlanner: React.FC = () => {
  const [activities, setActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedActivity, setEditedActivity] = useState('');

  const addActivity = () => {
    if (newActivity.trim() !== '') {
      setActivities([...activities, newActivity]);
      setNewActivity('');
    }
  };

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const editActivity = (index: number) => {
    setIsEditing(index);
    setEditedActivity(activities[index]);
  };

  const saveEdit = () => {
    if (isEditing !== null && editedActivity.trim() !== '') {
      const updatedActivities = [...activities];
      updatedActivities[isEditing] = editedActivity;
      setActivities(updatedActivities);
      setIsEditing(null);
      setEditedActivity('');
    }
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
          <li key={index}>
            {isEditing === index ? (
              <>
                <input 
                  type="text" 
                  value={editedActivity} 
                  onChange={(e) => setEditedActivity(e.target.value)} 
                />
                <button onClick={saveEdit}>Salva</button>
                <button onClick={() => setIsEditing(null)}>Annulla</button>
              </>
            ) : (
              <>
                {activity}
                <button onClick={() => editActivity(index)}>Modifica</button>
                <button onClick={() => removeActivity(index)}>Rimuovi</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesPlanner;
