import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {getWeatherForTheWeek} from '../services/weatherService';
import moment from 'moment';
let Cloudy = require('../assets/cloudy.png');
let Sunny = require('../assets/sunny.png');
let Windy = require('../assets/windy.png');
let Stormy = require('../assets/stormy.png');
let Rainy = require('../assets/rainy.png');
let Degree = require('../assets/celsius.png');
let Humidty = require('../assets/humidity.png');
let Clear = require('../assets/clear-sky.png');
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetSectionList,
} from '@gorhom/bottom-sheet';

const {width, height} = Dimensions.get('screen');
type WeatherInfo = {
  dt: number;
  temp: Temp;
  weather: Weathers[];
};
type Weathers = {
  id: number;
  main: string;
};
type Temp = {
  id: number;
  day: string;
  max: string;
  min: string;
};
type Week = {
  id: number;
  name: string;
};
const Forcast = () => {
  const [weather, setWeather] = useState<WeatherInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [weeks, setWeeks] = useState<Week[]>([
    {id: 1, name: 'First Week'},
    {id: 2, name: 'Second Week'},
  ]);
  const [selectedDayWeather, setSelectedDayWeather] = useState<number>(0);
  const snapPoints = useMemo(() => ['50%', '70%'], []);

  useEffect(() => {
    getWeeksWeather();
    return () => {
      setWeather([]);
    };
  }, []);
  const getWeeksWeather = async () => {
    setLoading(true);
    try {
      const {data} = await getWeatherForTheWeek();
      setWeather(data.daily);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator animating={loading} size={40} color="gold" />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.today}>
            <Image
              style={styles.icon}
              source={
                weather[0]?.weather[0]?.main.match(/clouds/i)
                  ? Cloudy
                  : weather[0]?.weather[0]?.main.match(/sun/i)
                  ? Sunny
                  : weather[0]?.weather[0]?.main.match(/storm/i)
                  ? Stormy
                  : weather[0]?.weather[0]?.main.match(/wind/i)
                  ? Windy
                  : weather[0]?.weather[0]?.main.match(/rain/i)
                  ? Rainy
                  : Clear
              }></Image>
            <View>
              <Text style={styles.text}>
                {moment(weather[0]?.dt * 1000).format('dddd')}
              </Text>
              <View>
                <Text style={styles.textSmaller}>
                  {weather[0]?.weather[0]?.main}
                </Text>
                <View style={styles.tempAndIcon}>
                  <Text style={styles.textSmaller}>
                    {weather[0]?.temp?.day}
                  </Text>
                  <Image style={styles.degIcon} source={Degree}></Image>
                </View>
              </View>
            </View>
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            handleIndicatorStyle={{backgroundColor: 'gold'}}
            backgroundStyle={{backgroundColor: '#021833'}}

            // onChange={handleSheetChanges}
          >
            <BottomSheetSectionList
              style={{backgroundColor: '#021833'}}
              showsVerticalScrollIndicator={false}
              sections={[
                {title: 'First Week', data: weather},
                {title: 'Second Week', data: weather},
              ]}
              data={weather}
              contentContainerStyle={styles.contentContainer}
              renderSectionHeader={({section}) => (
                <Text style={styles.header}>{section.title}</Text>
              )}
              renderItem={({item}) => (
                <View style={styles.dayAndIcon}>
                  <Text style={styles.weekDaysText}>
                    {moment(item.dt * 1000).format('ddd')}
                  </Text>
                  <Image
                    style={styles.degIcon}
                    source={
                      item.weather[0].main.match(/clouds/i)
                        ? Cloudy
                        : item.weather[0].main.match(/sun/i)
                        ? Sunny
                        : item.weather[0].main.match(/storm/i)
                        ? Stormy
                        : item.weather[0].main.match(/wind/i)
                        ? Windy
                        : item.weather[0].main.match(/rain/i)
                        ? Rainy
                        : Clear
                    }></Image>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 5,
                      }}>
                      <Text style={styles.weekDaysTextMax}>
                        {item?.temp?.max}
                      </Text>
                      <Image
                        style={{width: 10, height: 10}}
                        source={Degree}></Image>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.weekDaysText}>{item?.temp?.min}</Text>
                      <Image
                        style={{width: 10, height: 10}}
                        source={Degree}></Image>
                    </View>
                  </View>
                </View>
              )}></BottomSheetSectionList>
          </BottomSheet>
        </View>
      )}
    </View>
  );
};

export default Forcast;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#021843',
    flex: 1,
  },
  today: {
    height: height / 4,
    backgroundColor: '#15c3f4',
    borderRadius: 15,
    width: width - 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
    marginVertical: 5,
  },
  textSmaller: {
    fontSize: 20,
    fontWeight: '600',
  },
  tempAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  degIcon: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
    // marginVertical: 5,
  },
  weekDays: {
    flex: 1,
    width: width - 20,
    paddingHorizontal: 10,
  },
  dayAndIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  weekDaysTextMax: {
    fontSize: 15,
    color: 'white',
  },
  weekDaysText: {
    fontSize: 15,
    color: 'grey',
    width: 50,
  },
  header: {
    backgroundColor: 'gold',
    borderRadius: 15,
    padding: 10,
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  contentContainer: {
    backgroundColor: '#021833',
    paddingHorizontal: 10,
  },
});
