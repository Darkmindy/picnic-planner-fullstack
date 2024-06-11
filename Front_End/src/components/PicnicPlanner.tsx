import React from 'react';
import EventForm from './EventForm';
import FriendsList from './FriendsList';
import LocationPicker from './LocationPicker';
import MenuPlanner from './MenuPlanner';
import ActivitiesPlanner from './ActivitiesPlanner';
import './PicnicPlanner.css';

const PicnicPlanner: React.FC = () => (
  <div className="picnic-planner">
    <h1>Pianifica il tuo Evento</h1>
    <EventForm />
    <FriendsList />
    <LocationPicker />
    <MenuPlanner />
    <ActivitiesPlanner />
  </div>
);

export default PicnicPlanner;
