import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

export const AppButton = (props) => {
  return (
    <View style={styles.container}>
      <Button
        {...props}
        buttonStyle={[styles.buttonStyle, { backgroundColor: props.color || 'blue' }]}
        containerStyle={{ margin: 0 }}
        titleStyle={{
          fontSize: props.fontSize,
          padding: props.padding,
          margin: 0,
        }}
      />
    </View>
  );
};

AppButton.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.number,
  padding: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  buttonStyle: {
    padding: 12,
    width: '100%',
  },
});
