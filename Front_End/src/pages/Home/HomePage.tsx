import React from 'react';
import { Container, Row, Col, Navbar as BootstrapNavbar, Nav, Button, Dropdown, Image, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EventCard from '../../components/EventCard/EventCard';
import InvitedCard from '../../components/InvitedCard/InvitedCard';
import EventForm from '../../components/EventForm/EventForm';
import './HomePage.css';
import { logOut } from '../../api/userApi';
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';

const user = {
    name: 'Nome Utente',
    profileImage: 'https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1719444878~exp=1719445478~hmac=db2fad68971db4f83df5f6ab0eab1d99315cff993c7831f43b5f5482f016feda',
};

const events = [

    { id:'1', title: 'Picnic al parco', date: '25 luglio 2024', time:'11:00 AM', location: 'Parco delle Cascine', partecipants: ['User 1', 'User 2'], status: 'In pianificazione' },
        { id:'2', title: 'Passeggiata in montagna', date: '27 Giugno 2024', time:'13:00 PM', location: 'Monte Etna', partecipants: ['User 3', 'User 4'], status: 'Completato' },
    // Aggiungi altri eventi secondo necessità
];

const invitedUsers = [
    { id: '1', name: 'User 1', status: 'Confermato' },
    { id: '2', name: 'User 2', status: 'In attesa' },
    // Aggiungi altri invitati secondo necessità
];


const HomePage: React.FC = () => {
    const { setUser, accessToken, setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut(accessToken)
      setUser(null);
      setAccessToken("");
      setRefreshToken("");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
    const userImageURL = user.profileImage;

const [showEventForm, setShowEventForm] = React.useState(false);

    const handleAccept = (id: string) => {
        // Logica per accettare l'invito, ad esempio aggiornare lo stato degli invitati
        console.log(`Accettato l'invito per l'utente con ID: ${id}`);
    };

    const handleDecline = (id: string) => {
        // Logica per rifiutare l'invito, ad esempio rimuovere l'utente dagli invitati
        console.log(`Rifiutato l'invito per l'utente con ID: ${id}`);
    };

    return (
        <div className="HomePage">
            <BootstrapNavbar bg="light" expand="lg" className="Navbar">
                <Container fluid>
                    <BootstrapNavbar.Brand as={Link} to="/">Picnic Planner</BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                    <BootstrapNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/calendar">Calendario</Nav.Link>
                            <Nav.Link as={Link} to="/activity">Attività</Nav.Link>
                            <Nav.Link as={Link} to="/messages">Messaggi</Nav.Link>
                            <Nav.Link as={Link} to="/settings">Impostazioni</Nav.Link>
                        </Nav>
                        <Form className="d-flex search-bar">
                            <Form.Control type="search" placeholder="Cerca..." className="me-2" />
                            <Button variant="outline-success">Cerca</Button>
                        </Form>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" id="dropdown-profile">
                                <Image src={userImageURL} roundedCircle className="profile-image" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/notifications">Notifiche</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/profile">Profilo</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>

            <Container fluid className="main-container">
                <Row>
                    <Col md={3} className="Sidebar bg-light">
                        <h3>Sidebar</h3>
                        <ul>
                            <li><Link to="/">Link 1</Link></li>
                            <li><Link to="/">Link 2</Link></li>
                            <li><Link to="/">Link 3</Link></li>
                        </ul>
                    </Col>
                    <Col md={9} className="MainContent">
                        <Row className="Hero">
                            <Col md={12} className="hero-section">
                                <img src="https://example.com/hero-image.jpg" alt="Hero" className="hero-image" />
                                <div className="hero-content">
                                    <h1>Traveling to Switzerland</h1>
                                    <p>11 Nov - 16 Nov | 11:00 AM</p>
                                    <Button variant="primary">Details</Button>
                                </div>
                            </Col>
                        </Row>

                       <Row className="UpcomingSchedule mt-4">
                            <Col md={12}>
                                <h2>Upcoming Schedule</h2>
                                <div className="schedule">
                                    {events.map((event) => (
                                        <EventCard
                                            key={event.id}
                                            title={event.title}
                                            date={event.date}
                                            location={event.location}
                                            status="" // Modifica qui per includere lo stato dell'evento
                                        />
                                    ))}
                                </div>
                            </Col>
                        </Row>

                        <Row className="InvitedUsers mt-4">
                            <Col md={12}>
                                <h2>Invitati</h2>
                                <div className="invited-users">
                                    {invitedUsers.map((invited) => (
                                        <InvitedCard
                                            key={invited.id}
                                            name={invited.name}
                                            status={invited.status}
                                            onAccept={() => handleAccept(invited.id)}
                                            onDecline={() => handleDecline(invited.id)}
                                        />
                                    ))}
                                </div>
                            </Col>
                        </Row>


                        <Row className="CreateEvent mt-4">
                            <Col md={12}>
                                <h2>Have a Good Day, Wendy</h2>
                                <p>Fuel your days with the boundless enthusiasm of a lifelong explorer.</p>
                                <Button variant="primary" onClick={() => setShowEventForm(true)}>I want to...</Button>
                        </Col>
                        </Row>
                        { showEventForm && <EventForm />}
                    </Col>
                </Row>
            </Container>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default HomePage;