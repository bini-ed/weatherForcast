import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import Forcast from '../screens/Forcast';

const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="Forcast"
        component={Forcast}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigation;
