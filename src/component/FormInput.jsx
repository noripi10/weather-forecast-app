import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from 'react-native-elements';
import PropTypes from 'prop-types';

export const FormInput = (props) => {
  const { description, placeholder, color, ...anotherProps } = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.description, { color }]}>{description}</Text>
      <Input style={{ color }} {...anotherProps} placeholder={placeholder} />
    </View>
  );
};

FormInput.propTypes = {
  description: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  description: {
    paddingLeft: 10,
  },
});
