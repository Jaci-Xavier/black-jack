import React, { useContext } from 'react';
import { LoginContext } from '../context/LoginProvider';

function Login() {
  const { login, setLogin, isDisabled, setIsDisabled } = useContext(LoginContext);

  const validateLogin = () => {
    const { email, password } = login;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordRegex = /^.{6,}$/g;
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
    validateLogin();
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <button
          type="submit"
          disabled={ isDisabled }
        >
          Login

        </button>
      </form>
    </div>
  );
}

export default Login;
