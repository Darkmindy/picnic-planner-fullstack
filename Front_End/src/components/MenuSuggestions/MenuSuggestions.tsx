// components/MenuSuggestions/MenuSuggestions.tsx

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios'; // Assicurati di avere axios installato e importato

const MenuSuggestions: React.FC = () => {
    const [menuItems, setMenuItems] = useState<string[]>([]);

    useEffect(() => {
        // Esempio di chiamata a un endpoint per ottenere i suggerimenti del menù
        axios.get('/api/menu-suggestions')
            .then(response => {
                setMenuItems(response.data); // Supponendo che il backend ritorni un array di stringhe
            })
            .catch(error => {
                console.error('Errore durante il recupero dei suggerimenti del menù:', error);
            });
    }, []);

    return (
        <Container fluid className="menu-suggestions">
            <h2>Suggerimenti per il Menù</h2>
            <Row>
                {menuItems.map((item, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{item}</Card.Title>
                                <Card.Text>
                                    Descrizione del piatto o altro dettaglio.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MenuSuggestions;
