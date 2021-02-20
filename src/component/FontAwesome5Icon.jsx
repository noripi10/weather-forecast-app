import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export const FontAwesome5Icon = ({ name, size = 24, color = 'gray' }) => (
	<FontAwesome5 name={name} size={size} color={color} />
);
