import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://192.168.1.33:3000/api',
});

const register = async ({ username, email, phone_number, password }) => {
  try {
    console.log('Registering user with data:', { username, email, phone_number, password });
    const response = await instance.post('/auth/register', {
      username,
      email,
      phone_number,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

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
    // Save the user data locally
    await AsyncStorage.setItem('userData', JSON.stringify(response));
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomePage' }],
    });
  } catch (error) {
    console.log('Error registering user:', error);
  }
};

const login = async (identifier, password) => {
  try {
    const response = await instance.post('/auth/login', {
      identifier,
      password,
    });

    // Save the user data locally
    await AsyncStorage.setItem('userData', JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  register,
  login,
};
