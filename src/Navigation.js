import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!userToken);
      setIsLoading(false);
    } catch (error) {
      console.log('Error checking token:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
