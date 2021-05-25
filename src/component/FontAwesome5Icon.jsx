import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export const FontAwesome5Icon = ({ name, size = 24, color = 'gray' }) => (
  <FontAwesome5 name={name} size={size} color={color} />
);

FontAwesome5Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};
