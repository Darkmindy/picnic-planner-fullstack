import React, { FC, FormEvent, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Checkbox from "../Checkbox/Checkbox";
import "./LoginForm.css";

const strengthLabels = ["weak", "medium", "strong"];

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [strength, setStrength] = useState("");

  const getStrength = (password: string) => {
    let strengthIndicator: number = 0;
    let upper = false,
      lower = false,
      numbers = false;

    for (let index = 0; index < password.length; index++) {
      const char = password.charCodeAt(index);
      if (!upper && char >= 65 && char <= 90) {
        upper = true;
        strengthIndicator++;
      }

      if (!numbers && char >= 48 && char <= 57) {
        numbers = true;
        strengthIndicator++;
      }

      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        strengthIndicator++;
      }
    }

    setStrength(strengthLabels[strengthIndicator] || "");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    getStrength(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    const isAdminLogin = formData.get("checked") === "on";
    if (isAdminLogin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-card">
      <img src="assets/Icons/logo.png" alt="Logo" />
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="username">
          <Input required
            autoComplete="off"
            spellCheck="false"
            className="control"
            type="email"
            placeholder="Email"
            label={""}
          />
          <div id="spinner" className="spinner"></div>
        </div>
        <Input required
          name="password"
          spellCheck="false"
          className="control"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          label={""}
        />
        <div className={`bars ${strength}`}>
          <div></div>
        </div>
        <div className="strength">{strength && <>{strength} password</>}</div>
        <Checkbox name="check" type="checkbox" label="Admin" />
        <br></br>
        <Button
          type="submit"
          className="btn btn-outline-primary"
          label="Login"
        />
      </form>
    </div>
  );
};

export default LoginForm;
