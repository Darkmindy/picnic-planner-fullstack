import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => (
  <div className="homepage">
    <header className="header">
      <h1>Benvenuti su "Chinnicchiennacchi"</h1>
      <p>Organizza e pianifica il tuo picnic perfetto con amici e familiari.</p>
    </header>
    <main className="main-content">
      <section className="features">
        <h2>Caratteristiche principali</h2>
        <ul>
          <li>Crea eventi picnic</li>
          <li>Invita amici e familiari</li>
          <li>Collaborare nella scelta della location e del menù</li>
          <li>Mappe interattive con aree picnic consigliate</li>
          <li>Suggerimenti per il menù e attività divertenti all'aperto</li>
        </ul>
      </section>
      <section className="cta">
        <Link to="/planner" className="cta-button">
          Inizia a Pianificare
        </Link>
      </section>
    </main>
  </div>
);

export default HomePage;
