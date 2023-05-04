// LogoutButton.js
import React, { useContext } from 'react';
import { Button } from 'react-native-elements';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutButton() {
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem('userData');
    setIsAuthenticated(false);
  };

  return <Button title="Logout" onPress={handleLogout} />;
}
