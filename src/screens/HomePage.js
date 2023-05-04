import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoFeed from '../VideoFeed';
import LogoutButton from '../LogoutButton';


const HomePage = ({ navigation }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <VideoFeed/>
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')}>
          <Text style={styles.tabText}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Inbox')}>
          <Text style={styles.tabText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('UserProfile')}>
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    paddingBottom: 10,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 12,
    color: '#8e8e8e',
  },
  tabTextActive: {
    color: '#000000',
  },
});

export default HomePage;
