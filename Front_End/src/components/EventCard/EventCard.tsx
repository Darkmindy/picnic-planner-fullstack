import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface EventCardProps {
    title: string;
    date: string;
    location: string;
    status: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, location, status }) => {
    return (
        <Card style={{ width: '18rem', marginBottom: '20px' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <strong>Data:</strong> {date}<br />
                    <strong>Luogo:</strong> {location}<br />
                    <strong>Stato:</strong> {status}
                </Card.Text>
                <Button variant="primary">Dettagli</Button>
            </Card.Body>
        </Card>
    );
}

export default EventCard;
