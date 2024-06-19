import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import App from "../App"; // Importa il componente principale dell'applicazione
import reportWebVitals from "../reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    {/* Utilizza BrowserRouter come wrapper principale per l'applicazione */}
    <BrowserRouter>
      <App /> {/* Rende il componente principale dell'applicazione */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root") // Monta l'applicazione nel div con id "root" nel tuo file HTML
);

// Misure di performance
reportWebVitals();
