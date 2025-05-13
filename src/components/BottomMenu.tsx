import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes';
import { _thBottomMenu } from '../styles/BottomMenuStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BroIcons } from './Icons';
import { IconStyles } from '../styles/IconStyles';

const BottomMenu = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userId, setUserId] = useState<any>(); // userId state
  const route = useRoute();

  const isActive = (screen: string) => route.name === screen;
  useEffect(() => {
    // AsyncStorage'dan userId'yi al
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
        }
      } catch (e) {
        console.error('Error reading userId from AsyncStorage', e);
      }
    };
    getUserId();
  }, []);

  return (
     <View style={_thBottomMenu.footer}>
      <View style={_thBottomMenu.menuContainer}>
        <TouchableOpacity
          style={_thBottomMenu.menuItem}
          onPress={() => {
            if (!isActive('Home')) navigation.navigate('Home');
          }}
        >
          <BroIcons.Home size={24} color={isActive('Home') ? '#4B0082' : '#003333'} />
          <Text style={[_thBottomMenu.menuText, isActive('Home') && _thBottomMenu.activeText]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={_thBottomMenu.menuItem}
          onPress={() => {
            if (!isActive('Tickets')) navigation.navigate('Tickets');
          }}
        >
          <BroIcons.Ticket size={24} color={isActive('Tickets') ? '#4B0082' : '#003333'} />
          <Text style={[_thBottomMenu.menuText, isActive('Tickets') && _thBottomMenu.activeText]}>
            Tickets
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={_thBottomMenu.menuItem}
          onPress={() => {
            if (!isActive('Search')) navigation.navigate('Search', { searchQuery: '' });
          }}
        >
          <BroIcons.Search size={24} color={isActive('Search') ? '#4B0082' : '#003333'} />
          <Text style={[_thBottomMenu.menuText, isActive('Search') && _thBottomMenu.activeText]}>
            Search
          </Text>
        </TouchableOpacity>

      
        <TouchableOpacity
          style={_thBottomMenu.menuItem}
          onPress={() => {
            if (!isActive('Favorites')) navigation.navigate('Favorites', { userId: Number(userId) });
          }}
        >
         <BroIcons.HeartOutline size={24} color={isActive('Favorites') ? '#4B0082' : '#003333'} />
          <Text style={[_thBottomMenu.menuText, isActive('Favorites') && _thBottomMenu.activeText]}>
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={_thBottomMenu.menuItem}
          onPress={() => {
            if (!isActive('Profile')) navigation.navigate('Profile', {userId: userId });
          }}
        >
          <BroIcons.List size={24} color={isActive('Profile') ? '#4B0082' : '#003333'} />
          <Text style={[_thBottomMenu.menuText, isActive('Profile') && _thBottomMenu.activeText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomMenu;
