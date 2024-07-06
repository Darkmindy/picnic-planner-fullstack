import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../services/AuthContext';
import { deleteEvent, updateEvent } from '../../api/eventApi';

interface EventCardProps {
    _id?: string;
    title: string;
    date: string;
    location: string;
    description: string;
    getEvents: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ _id, title, date, location, description, getEvents }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: title,
        date: date,
        location: location,
        description: description
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const { accessToken } = useAuth();
    const toggleUpdateForm = () => {
        setIsEditing(!isEditing)
    }

    const toggleDeleteForm = () => {
        setIsDeleting(!isDeleting);
    }



    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateEvent(accessToken.current, {_id, ...formData});
            toggleUpdateForm();
            getEvents();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await deleteEvent(accessToken.current, _id!);
            toggleDeleteForm();
            getEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }

    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <strong>Id:</strong> {_id}<br />
                    <strong>Data:</strong> {date}<br />
                    <strong>Luogo:</strong> {location}<br />
                    <strong>Stato:</strong> {status}
                </Card.Text>
                <Button variant="primary">Dettagli</Button>
                <Button variant="secondary" onClick={toggleUpdateForm}>Edit...</Button>
                <Button variant="danger" onClick={toggleDeleteForm}>Delete</Button>
                {isEditing && (
                    <form>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" defaultValue={title} onChange={e => setFormData({...formData, title: e.target.value})}/>
                        <label htmlFor="date">Date:</label>
                        <input type="text" id="date" name="date" defaultValue={date} onChange={e => setFormData({...formData, date: e.target.value})}/>
                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" name="location" defaultValue={location} onChange={e => setFormData({...formData, location: e.target.value})}/>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="status" name="description" defaultValue={description} onChange={e => setFormData({...formData, description: e.target.value})}/>
                        <button type="submit" onClick={handleUpdate}>Update</button>
                    </form>
                )}
                {isDeleting && (
                    <form>
                        <p>Are you sure you want to delete this event?</p>
                        <button type="submit" onClick={handleDelete}>Delete</button>
                    </form>
                )}
            </Card.Body>
        </Card>
    );
}

export default EventCard;
