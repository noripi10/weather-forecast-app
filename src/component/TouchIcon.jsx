import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export const TouchIcon = ({ name, size = 24, color = 'gray' }) => (
  <TouchableOpacity>
    <Feather name={name} size={size} color={color} />
  </TouchableOpacity>
);

TouchIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
