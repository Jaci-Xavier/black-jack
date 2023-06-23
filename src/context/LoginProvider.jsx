import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const obj = { email: '', password: '', isDisabled: true };
  const [login, setLogin] = useState(obj);
  const [isDisabled, setIsDisabled] = useState(true);

  const values = useMemo(() => ({
    login,
    setLogin,
    isDisabled,
    setIsDisabled,
  }), [login, setLogin, isDisabled, setIsDisabled]);

  return (
    <LoginContext.Provider value={ values }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
