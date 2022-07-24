import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentWeather, getWeatherForDate} from '../services/weatherService';
let Cloudy = require('../assets/cloudy.png');
let Sunny = require('../assets/sunny.png');
let Windy = require('../assets/windy.png');
let Stormy = require('../assets/stormy.png');
let Rainy = require('../assets/rainy.png');
let Degree = require('../assets/celsius.png');
let Humidty = require('../assets/humidity.png');
let Clear = require('../assets/clear-sky.png');
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Header from '../component/Header';
import {getWeatherFetch} from '../appStateRedux/weatherSlice';

type WeatherInfo = {
  weather?: Array<object>;
  main?: {
    temp: '';
    temp_min: '';
    temp_max: '';
    humidity: '';
  };
  temp?: {
    day: '';
    max: '';
    min: '';
    humidity: '';
  };
};

const {width, height} = Dimensions.get('screen');

const MainScreen = () => {
  const [weather, setWeather] = useState<WeatherInfo>();
  const [selectedDayWeather, setSelectedDayWeather] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const {weathers, loading: cartLoading} = useSelector(
    (state: any) => state.weathers,
  );
  const dispatch = useDispatch();
  const date = new Date();
  const intitalDate = date.toDateString();

  useEffect(() => {
    getTodaysWeather();
    dispatch(getWeatherFetch());
    return () => {
      setWeather(undefined);
    };
  }, []);

  const handleDateChange = async (day: any) => {
    setLoading(true);
    try {
      const {data} = await getWeatherForDate();
      const date = moment(day?.timestamp).format('YYYY-MM-DD').toString();
      setSelectedDay(moment(day.timestamp).format('MMMM Do, dddd'));
      const datas = data?.daily?.filter(
        (item: any) => moment(item?.dt * 1000).format('YYYY-MM-DD') === date,
      );
      datas[0].weather[0].main.match(/clouds/i)
        ? setSelectedDayWeather(Cloudy)
        : datas[0].weather[0].main.match(/sun/i)
        ? setSelectedDayWeather(Sunny)
        : datas[0].weather[0].main.match(/storm/i)
        ? setSelectedDayWeather(Stormy)
        : datas[0].weather[0].main.match(/wind/i)
        ? setSelectedDayWeather(Windy)
        : datas[0].weather[0].main.match(/rain/i)
        ? setSelectedDayWeather(Rainy)
        : setSelectedDayWeather(Clear),
        setWeather(datas[0]);
      setLoading(false);
    } catch (error) {
      console.log('err', error);
    }
  };

  const getTodaysWeather = async () => {
    setLoading(true);
    try {
      const {data} = await getCurrentWeather();
      setWeather(data);
      setSelectedDay(moment(data.dt * 1000).format('MMMM Do, dddd'));
      data.weather[0].main.match(/clouds/i)
        ? setSelectedDayWeather(Cloudy)
        : data.weather[0].main.match(/sun/i)
        ? setSelectedDayWeather(Sunny)
        : data.weather[0].main.match(/storm/i)
        ? setSelectedDayWeather(Stormy)
        : data.weather[0].main.match(/wind/i)
        ? setSelectedDayWeather(Windy)
        : data.weather[0].main.match(/rain/i)
        ? setSelectedDayWeather(Rainy)
        : setSelectedDayWeather(Clear);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header page="main" title="Todays weather" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Calendar
          style={styles.calendar}
          initialDate={intitalDate}
          minDate={intitalDate}
          onDayPress={day => {
            handleDateChange(day);
          }}
          theme={{
            calendarBackground: '#021823',
          }}
          monthFormat={'yyyy MM'}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
        />
        <View style={styles.weatherInfo}>
          {loading ? (
            <ActivityIndicator animating={loading} color="white" size={45} />
          ) : weather ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Forcast' as never)}
                style={{
                  backgroundColor: 'beige',
                  padding: 10,
                  borderRadius: 10,
                  alignSelf: 'flex-end',
                  margin: 10,
                }}>
                <Text style={{color: 'black'}}>7 days {'>'}</Text>
              </TouchableOpacity>
              <Text
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 20,
                  fontSize: 25,
                  color: 'gold',
                }}>
                {selectedDay}
              </Text>
              <Image source={selectedDayWeather} style={styles.icon}></Image>
              <View style={styles.weatherCard}>
                <View style={styles.card}>
                  <View style={styles.tempWithIcon}>
                    <Text style={styles.text}>
                      {weather?.main?.temp_min || weather?.temp?.min}
                    </Text>
                    <Image source={Degree} style={styles.textIcon}></Image>
                  </View>
                  <Image
                    source={selectedDayWeather}
                    style={styles.icon}></Image>
                  <Text style={styles.text}>Minimum </Text>
                </View>
                <View style={styles.card}>
                  <View style={styles.tempWithIcon}>
                    <Text style={styles.text}>
                      {weather?.main?.humidity || weather?.humidity}
                    </Text>
                    <Image source={Degree} style={styles.textIcon}></Image>
                  </View>
                  <Image source={Humidty} style={styles.icon}></Image>
                  <Text style={styles.text}>Humidity</Text>
                </View>
                <View style={styles.card}>
                  <View style={styles.tempWithIcon}>
                    <Text style={styles.text}>
                      {weather?.main?.temp_max || weather?.temp?.max}
                    </Text>
                    <Image source={Degree} style={styles.textIcon}></Image>
                  </View>
                  <Image
                    source={selectedDayWeather}
                    style={styles.icon}></Image>
                  <Text style={styles.text}>Maximum</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text style={styles.tmpColor}>
                  {weather?.main?.temp || weather?.temp?.day}
                </Text>
                <Image source={Degree} style={{width: 30, height: 30}}></Image>
              </View>
            </>
          ) : (
            <View style={styles.wrong}>
              <Text style={styles.textError}>
                Can't fetch the data with your current plan of Open weather API,
                Please purchase another plan and try again!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021833',
  },
  scroll: {
    padding: 10,
    paddingBottom: 150,
    width: '100%',
  },
  calendar: {
    width: width - 20,
    borderRadius: 10,
    paddingBottom: 10,
    backgroundColor: '#021823',
    borderColor: 'whitesmoke',
    borderWidth: 0.2,
  },
  weatherInfo: {
    backgroundColor: '#3293ba',
    height: height / 2,
    borderRadius: 15,
    width: width - 20,
    marginTop: 15,
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 50,
  },
  icon: {
    width: '100%',
    height: '40%',
    resizeMode: 'contain',
    marginVertical: 5,
  },
  weatherCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'whitesmoke',
    width: width / 3 - 20,
    height: 120,
    margin: 5,

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  tmpColor: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  tempWithIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIcon: {width: 20, height: 20},
  wrong: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textError: {
    fontSize: 18,
    color: 'white',
    backgroundColor: 'tomato',
    borderRadius: 15,
    padding: 10,
  },
});
