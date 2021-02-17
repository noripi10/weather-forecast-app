import React, { createContext, useState } from 'react';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('default');

	return (
		<ThemeProvider.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeProvider.Provider>
	);
};
