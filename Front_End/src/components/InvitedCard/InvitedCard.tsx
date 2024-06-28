import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface InvitedCardProps {
    name: string;
    status: string; // Può essere "Confermato", "In attesa", etc.
    onAccept: () => void; // Funzione chiamata quando l'invitato accetta l'invito
    onDecline: () => void; // Funzione chiamata quando l'invitato rifiuta l'invito
}

const InvitedCard: React.FC<InvitedCardProps> = ({ name, status, onAccept, onDecline }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Status: {status}</Card.Text>
                <Button variant="success" onClick={onAccept}>Accetta</Button>{' '}
                <Button variant="danger" onClick={onDecline}>Rifiuta</Button>
            </Card.Body>
        </Card>
    );
}

export default InvitedCard;
