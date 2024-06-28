import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

function Sidebar() {
  return (
    <Navbar bg="light" expand="lg" className="flex-column sidebar">
      <Navbar.Brand as={Link} to="/">
        Planner eventi
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="example-navbar-nav" />
      <Navbar.Collapse id="example-navbar-nav">
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/">I miei eventi</Nav.Link>
          <Nav.Link as={Link} to="/shared-events">Eventi condivisi</Nav.Link>
          <Nav.Link as={Link} to="/create-event">Crea evento</Nav.Link>
          <Nav.Link as={Link} to="/settings">Impostazioni</Nav.Link>
          <Nav.Link as={Link} to="/help">Aiuto</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;