import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useIsDark = () => useContext(ThemeContext).theme;

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
