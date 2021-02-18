import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const TouchIcon = ({ name, size = 24, color = 'gray' }) => (
	<TouchableOpacity>
		<Feather name={name} size={size} color={color} />
	</TouchableOpacity>
);
