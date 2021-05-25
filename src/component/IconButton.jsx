import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export const IconButton = ({ name, size, color, ...anotherProps }) => {
  return (
    <TouchableOpacity style={styles.container} {...anotherProps}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
