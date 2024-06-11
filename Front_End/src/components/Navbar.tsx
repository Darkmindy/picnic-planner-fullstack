import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

  // Funzione per cambiare la modalità
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navbarClass = isDarkMode ? 'navbar dark-mode' : 'navbar';

  return (
    <nav className={navbarClass}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/planner">Pianificatore</Link>
        </li>
        {/* Aggiungi altri link della navbar qui */}
      </ul>
      {/* Aggiungi un pulsante per cambiare modalità */}
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </nav>
  );
};

export default Navbar;
