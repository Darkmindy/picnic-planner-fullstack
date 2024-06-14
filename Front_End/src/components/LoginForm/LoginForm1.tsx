import React, { useRef, useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/api';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './LoginForm1.css';
import SignUpForm from '../SignUpForm/SignUpForm';
import Checkbox from '../Checkbox/Checkbox';


const LoginForm1: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user"
  });

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await signIn(formData);
      console.log(response);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error)
      const err = error as { response: { status: number } };
      if (err.response.status == 404) {
        setMessage("Invalid email or password");
      }
    }
    // const isAdminLogin = formData.get("checked") === "on";
    // setIsLoggedIn(true);

    // if (isAdminLogin) {
    //   navigate("/admin");
    // } else {
    //   navigate("/");
    // }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "role") {
      setFormData({ ...formData, role: e.target.checked ? "admin" : "user" });
    } else {
      setMessage("");
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false); // Reimposta lo stato di autenticazione a false
    navigate("/login");
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="form-container sign-up-container">
        <SignUpForm />
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
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Checkbox label="Admin? Check this box" name="role" onChange={handleChange} />
          <a href="#">Forgot your password?</a>
          <Button type="submit" label="Sign In" />
          <p>{message}</p>
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
      {isLoggedIn && (
        <div className="logout-button-container">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm1;
