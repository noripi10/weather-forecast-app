import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return <AuthUserContext.Provider value={{ user, setUser }}>{children}</AuthUserContext.Provider>;
};

AuthUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
