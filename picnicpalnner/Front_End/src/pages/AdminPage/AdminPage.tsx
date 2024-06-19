import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Funzione per la validazione del modulo
  const validateForm = () => {
    // Verifica che tutti i campi del modulo siano stati compilati
    // In questo esempio, assumiamo che tutti i campi siano obbligatori
    // Puoi aggiungere ulteriori controlli e validazioni secondo le esigenze del tuo progetto
    return true; // Restituiamo true per ora, implementa la tua logica di validazione qui
  };

  // Funzione per l'invio dei dati al backend
  const submitDataToBackend = () => {
    // Qui dovresti includere il codice per l'invio effettivo dei dati al backend
    // Puoi utilizzare Axios o qualsiasi altra libreria di tua scelta per effettuare la richiesta HTTP
    // In questo esempio, supponiamo che l'invio dei dati sia stato completato con successo
  };

  const handleSubmit = () => {
    // Verifica se i campi del modulo sono stati compilati correttamente
    const formIsValid = validateForm();

    if (formIsValid) {
      // Invia i dati al backend
      submitDataToBackend();

      // Imposta lo stato per indicare che l'invio è stato completato con successo
      setSubmitted(true);

      // Naviga alla pagina principale dopo 2 secondi
      setTimeout(() => navigate("/"), 2000);
    } else {
      // Se il modulo non è valido, visualizza un messaggio di errore
      setError(true);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="text-center">Admin Page</h1>
      <div className="form-container">
        <Input name="title" type="text" label="Name" />
        <Input name="category" type="text" label="Type" />
        <Input name="price" type="number" label="Price" />
        <Input name="image" type="file" label="Image" />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {submitted && (
          <p className="success-message">Submitted successfully!</p>
        )}
        {error && (
          <p className="error-message">
            Error submitting data. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
