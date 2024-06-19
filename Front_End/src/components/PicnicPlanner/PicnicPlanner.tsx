import React from 'react';
import EventForm from '../EventForm/EventForm';
import FriendsList from '../FriendsList/FriendsList';
import LocationPicker from '../LocationPicker/LocationPicker';
import MenuPlanner from '../MenuPlanner/MenuPlanner';
import ActivitiesPlanner from '../ActivitiesPlanner/ActivitiesPlanner';
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
