import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

let Left = require('../assets/left1.png');

type Props = {
  title: string;
  page: string;
};

const Header = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {props.page === 'detail' ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <Image
            source={Left}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
            }}></Image>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{props.title}</Text>
      <View></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
    borderBottomColor: 'gold',
    borderBottomWidth: 0.5,
    marginVertical: 10,
    paddingBottom: 15,
  },
  back: {
    borderWidth: 0.5,
    borderColor: 'white',
    padding: 10,
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
    top: 0,
    borderRadius: 50,
  },
  title: {
    fontSize: 25,
  },
});
