import React from 'react';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export const FeatherIcon = ({ name, size = 24, color = 'gray' }) => <Feather name={name} size={size} color={color} />;

FeatherIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};
