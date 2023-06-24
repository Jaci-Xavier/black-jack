import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginProvider';
import { drawCards } from '../utilities/fetchApi';

function Login() {
  const {
    login,
    setLogin,
    isDisabled,
    setIsDisabled,
    setDeck,
  } = useContext(LoginContext);

  const navigate = useNavigate();

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
          type="button"
          disabled={ isDisabled }
          onClick={ handleClickLogin }
        >
          Login

        </button>
      </form>
    </div>
  );
}

export default Login;
