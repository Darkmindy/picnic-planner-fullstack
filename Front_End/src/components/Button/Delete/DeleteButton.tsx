import React, { useState } from "react";
import "./DeleteButton.css";

const DeleteButton: React.FC = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleClick = () => {
    setIsDeleting(true);
    // do something async
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleted(true);
      setTimeout(() => {
        setIsDeleted(false);
      }, 1250);
    }, 2500);
  };

  return (
    <div className="page">
      <button
        onClick={handleClick}
        className={`delete-button ${isDeleting || isDeleted ? "deleting" : ""}`}
        disabled={isDeleting || isDeleted}
      >
        <span className="button-text">
          {isDeleting || isDeleted ? "Deleting" : "Delete"}
        </span>
        <span className="animation">
          <span className="balls"></span>
          <span className="lid"></span>
          <span className="can">
            <span className="filler"></span>
          </span>
        </span>
      </button>
    </div>
  );
};

export default DeleteButton;
