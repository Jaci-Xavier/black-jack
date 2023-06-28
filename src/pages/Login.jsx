import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginProvider';
import { drawCards } from '../utilities/fetchApi';
import '../style/App.css';
import DarkMode from '../components/DarkMode';

function Login() {
  const { login,
    setLogin, isDisabled, setIsDisabled, setDeck, isDarkMode } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

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

  const handleClickLogin = async () => {
    const deck = await drawCards();
    setDeck(deck);
    navigate('/game');
  };

  return (
    <div>
      <DarkMode />
      <div className="box">
        <div className="title">
          <h1>Black Jack</h1>
        </div>
        <form className="login-container">
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
            type="button"
            disabled={ isDisabled }
            onClick={ handleClickLogin }
            className="login-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
