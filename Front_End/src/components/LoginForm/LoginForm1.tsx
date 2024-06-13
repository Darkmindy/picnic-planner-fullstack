import React, { useRef, useState, ChangeEvent, FormEvent } from 'react';
import './LoginForm1.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const strengthLabels = ["weak", "medium", "strong"];

const LoginForm1: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [strength, setStrength] = useState("");

  const handleSignUpClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.add('right-panel-active');
    }
  };

  const handleSignInClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove('right-panel-active');
    }
  };

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'password') {
      getStrength(event.target.value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    const isAdminLogin = formData.get("check") === "on";
    if (isAdminLogin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <Input
            type="text"
            placeholder="Name"
            required
          />
          <Input
            type="email"
            placeholder="Email"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <div className={`bars ${strength}`}>
            <div></div>
          </div>
          <div className="strength">{strength && <>{strength} password</>}</div>
          <Button type="submit" label="Sign Up" />
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <Input
            type="email"
            placeholder="Email"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            required
          />
          <a href="#">Forgot your password?</a>
          <Button type="submit" label="Sign In" />
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <Button className="ghost" onClick={handleSignInClick} label="Sign In" />
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <Button className="ghost" onClick={handleSignUpClick} label="Sign Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm1;
