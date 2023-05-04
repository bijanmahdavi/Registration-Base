import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/HomePage';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ title: 'Home' }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
