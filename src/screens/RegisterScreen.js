import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import api from '../api';
import { AuthContext } from '../AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const { setIsAuthenticated } = useContext(AuthContext);

  const registerUser = async () => {
    try {
      console.log('Registering user with data:', { username, email, phone_number, password });
      const response = await api.register({
        username,
        email,
        phone_number,
        password,
      });
      console.log('User registered:', response);
      
      // Navigate to the login screen after successful registration
      navigation.navigate('Login');
      
    } catch (error) {
      console.log('Error registering user:', error);
    }
  };  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phone_number}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={registerUser}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navigateButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navigateButtonText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // ... Add the appropriate styles
});

export default RegisterScreen;
