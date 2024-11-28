import React, { useState } from "react";

import './assets/style.css';

import Input from "./components/common/input";
import useInput from "./customHooks/useInput";

function App() {

  // use useInput hook to handle states change
  // create states to handle form validation

  const { value: emailValue, onChange: emailHandler } = useInput('');
  const { value: passwordValue, onChange: passwordHandler } = useInput('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = /\S+@\S+\.\S+/.test(emailValue);
    setEmailError(!isEmailValid);

    const isPasswordValid = passwordValue.length >= 8;
    setPasswordError(!isPasswordValid);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            onChange={(e) => emailHandler(e)}
            value={emailValue}
            placeholder="Email"
            className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {emailError &&
            <p className="text-red-500 text-sm mb-2">Please enter a valid email address.</p>
          }
          <Input
            type="password"
            onChange={(e) => passwordHandler(e)}
            value={passwordValue}
            placeholder="Password"
            className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mb-2">Password must be at least 8 characters long.</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
