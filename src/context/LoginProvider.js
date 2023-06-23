import PropTypes from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';

export const LoginContext = createContext();

function LoginProvider({ children }) {
  const loginData = { email: '', password: '' };
  const [login, setLogin] = useState(loginData);

  const values = useMemo(() => ({ login, setLogin }), [login, setLogin]);

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
