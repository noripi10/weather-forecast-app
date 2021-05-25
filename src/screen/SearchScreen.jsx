import React, { useRef, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { FlatList } from 'react-native-gesture-handler';
import { AppButton } from '../component/AppButton';
import { FontAwesome5Icon } from '../component/FontAwesome5Icon';
import { ForecastItem } from '../component/ForecastItem';
import colorList from '../lib/colorList';
import { getMarkerLocationInfo } from '../lib/location';

const gifuStation = {
  latitude: 35.4095278,
  longitude: 136.7564656,
};

export const SearchScreen = () => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [currentCoordinate, setCurrentCoordinate] = useState(gifuStation);
  const [refreshing, setRefreshing] = useState(false);
  const preCoordinateRef = useRef(null);
  const { dark, colors } = useTheme();

  const getMakerLocation = async () => {
    try {
      if (preCoordinateRef.current) {
        if (
          currentCoordinate.latitude === preCoordinateRef.current.latitude &&
          currentCoordinate.longitude === preCoordinateRef.current.longitude
        ) {
          Alert.alert('前回検索と同じ位置です。\n同一地点の検索は10分間隔を\n開けて下さい');
          setRefreshing(false);
          return false;
        }
      }

      setRefreshing(true);

      const info = await getMarkerLocationInfo(currentCoordinate);
      preCoordinateRef.current = { ...currentCoordinate, time: new Date() };
      setLocationInfo(info);
    } catch (err) {
      // console.log({ err });
      // alert(JSON.stringify(err));
      Alert.alert('検索エラー');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={[StyleSheet.absoluteFill, { backgroundColor: '#fff' }]}
          initialRegion={{
            latitude: 35.39,
            longitude: 136.7564656,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05,
          }}>
          <Marker
            draggable
            coordinate={currentCoordinate}
            onDragEnd={(event) => {
              setCurrentCoordinate(event.nativeEvent.coordinate);
            }}>
            <FontAwesome5Icon name='map-pin' color={dark ? colorList.platform.ios.success : 'black'} size={48} />
          </Marker>
        </MapView>

        <Card
          containerStyle={[
            styles.weatherCard,
            {
              backgroundColor: colors.card,
            },
          ]}>
          <Card.Title
            style={{
              color: colors.text,
              textAlign: 'left',
            }}>
            {`3時間ごとの天気   ${locationInfo ? locationInfo.city : ''}`}
          </Card.Title>
          <View
            style={{
              flex: 1,
              position: 'absolute',
              width: 100,
              right: 0,
              top: -20,
            }}>
            <AppButton title='検索' color={colorList.primary} padding={0} onPress={() => getMakerLocation()} />
          </View>
          <Card.Divider />
          <View style={styles.cardItemContainer}>
            <View style={styles.listTitle}>
              <Text style={[styles.date, { color: colors.text }]}>日時</Text>
              <View style={{ width: '5%' }}></View>
              <Text style={[styles.description, { color: colors.text }]}>天気</Text>
              <Text style={[styles.temp, { color: colors.text }]}>気温</Text>
              <Text style={[styles.clouds, { color: colors.text }]}>降水確率</Text>
            </View>
            {locationInfo && locationInfo.forecastLater ? (
              <FlatList
                style={{ flex: 0.9 }}
                data={locationInfo.forecastLater || []}
                keyExtractor={(item) => item.dt_txt}
                renderItem={({ item }) => <ForecastItem {...{ item, colors }} />}
                ItemSeparatorComponent={() => (
                  <View>
                    <Divider />
                  </View>
                )}
                // refreshControl={
                // 	<RefreshControl
                // 		refreshing={refreshing}
                // 		onRefresh={() => getMakerLocation()}
                // 	/>
                // }
              />
            ) : (
              <View style={styles.noListContainer}>
                <Text style={{ color: colors.text }}>検索したい地点にマーカーを動かし検索して下さい</Text>
              </View>
            )}
          </View>
        </Card>
      </View>
      {refreshing && (
        <View style={styles.loading}>
          <ActivityIndicator size='large' />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
  },
  weatherCard: {
    borderRadius: 5,
    width: '98%',
    height: '42%',
    position: 'absolute',
    bottom: 10,
  },
  cardItemContainer: {
    position: 'relative',
    height: '82%',
    flexDirection: 'column',
  },
  listTitle: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
  },
  noListContainer: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    top: '50%',
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
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
