import React, { useState, ChangeEvent, FormEvent } from 'react';
import { signUp, adminSignUp } from '../../api/userApi';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';

const SignUpForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [message, setMessage] = useState<string>('');
  const strengthLabels = ["", "weak", "medium", "strong"];

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

    setStrength(strengthLabels[strengthIndicator]);
  };

  const handleStrength = (event: ChangeEvent<HTMLInputElement>) => {
    getStrength(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = { name, email, password, role };
      const response = role == "admin" ? await adminSignUp(userData) : await signUp(userData);
      setMessage(`User ${response.name} registered successfully!`);
    } catch (error) {
      const err = error as {message: string};
      if(err.message.split(" ").includes('"name"')) {
        setMessage('Name is required');
      } else
      setMessage('Error registering user');
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
    setMessage("")
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.checked ? "admin" : "user");
  }

  return (
    <>
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
          value={name}
          onChange={(e) => handleChange(e, setName)}
          placeholder="Name"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => { handleChange(e, setPassword); handleStrength(e); }}
          placeholder="Password"
        />
        <div className={`bars ${strength}`}>
          <div></div>
        </div>
        <div className="strength">{strength && `${strength} password`}</div>
        <Checkbox label="Admin? Sign up." name="role" onChange={handleCheckbox} />
        <p>{message}</p>
        <button type="submit">Sign Up</button>

      </form>
      
    </>
  );
};

export default SignUpForm;
