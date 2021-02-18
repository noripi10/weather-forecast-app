import React from 'react';
import { Feather } from '@expo/vector-icons';

export const FeatherIcon = ({ name, size = 24, color = 'gray' }) => (
	<Feather name={name} size={size} color={color} />
);
