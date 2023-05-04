import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { AuthContext } from '../AuthContext';

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const { setIsAuthenticated } = useContext(AuthContext);

  const loginUser = async () => {
    try {
      const response = await api.login(identifier, password);
      console.log('User logged in:', response);
      await AsyncStorage.setItem('userToken', response.data.IdToken);
      setIsAuthenticated(true);
      //navigation.navigate('HomePage');
    } catch (error) {
      console.log('Error logging in user:', error);
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.label}>Email or Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setIdentifier}
        value={identifier}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navigateButton} onPress={() => navigation.navigate('Register')}>        
        <Text style={styles.navigateButtonText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // ... Add the appropriate styles
});

export default LoginScreen;
