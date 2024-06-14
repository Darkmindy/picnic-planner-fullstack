import React, { useState, ChangeEvent, FormEvent } from 'react';
import { signUp } from '../../api/api';

const SignUpForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = { name, email, password };
      const response = await signUp(userData);
      setMessage(`User ${response.name} registered successfully!`);
    } catch (error) {
      setMessage('Error registering user');
      console.error(error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => handleChange(e, setName)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => handleChange(e, setPassword)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SignUpForm;
