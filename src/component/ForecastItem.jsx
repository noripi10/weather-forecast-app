import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

export const ForecastItem = ({ item, colors }) => {
  return (
    <View style={styles.renderItemContainer}>
      <Text style={[styles.date, { color: colors.text }]}>{moment(item.dt_txt).format('M/D (ddd) HH時')}</Text>
      <Image
        style={{ width: 20, height: 20 }}
        source={{
          uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }}
      />
      <Text style={[styles.description, { color: colors.text }]}>{item.weather[0].description}</Text>
      <Text style={[styles.temp, { color: colors.text }]}>{Math.round((item.main.temp - 273.15) * 100) / 100}℃</Text>
      <Text style={[styles.clouds, { color: colors.text }]}>{item.clouds.all}%</Text>
    </View>
  );
};

ForecastItem.propTypes = {
  item: PropTypes.shape({
    dt_txt: PropTypes.string.isRequired,
    weather: PropTypes.array.isRequired,
    main: PropTypes.object.isRequired,
    clouds: PropTypes.object.isRequired,
  }).isRequired,
  colors: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  renderItemContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    width: '35%',
    textAlign: 'left',
    paddingLeft: 5,
  },
  description: {
    width: '23%',
    textAlign: 'left',
  },
  temp: {
    width: '20%',
    textAlign: 'left',
  },
  clouds: {
    width: '15%',
    textAlign: 'left',
  },
});
