import React, { useState } from "react";
import Input from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    // Simula una richiesta di invio dati
    if (true) {
      setSubmitted(true);
      setTimeout(() => navigate("/main-page"), 2000); // Naviga alla pagina principale dopo 2 secondi
    } else {
      setError(true);
    }
  };

  return (
    <div className="admin-container">
      <img src="/images/master.png" alt="Logo" />
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
