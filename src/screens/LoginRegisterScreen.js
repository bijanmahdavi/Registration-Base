import React, { useState, useContext } from 'react'; // Import useContext here
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext'; // Import AuthContext here

const LoginRegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const { setIsAuthenticated, handleUserRegistration } = useContext(AuthContext);

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
      setIsAuthenticated(true); // Directly update the isAuthenticated state
  
      // Add the following line to reset the navigation to the HomePage
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomePage' }],
      });
    } catch (error) {
      console.log('Error registering user:', error);
    }
  };
  
  
  const loginUser = async () => {
    try {
      const identifier = username || email || phone;
      const response = await api.post('/auth/login', {
        identifier,
        password,
      });
      console.log('User logged in:', response.data);
      // Save the user data locally
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomePage' }],
      });
    } catch (error) {
      console.log('Error logging in user:', error.response.data);
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
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2f95dc',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginRegisterScreen;
