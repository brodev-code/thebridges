import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { extractCityFromAddress, getAddressFromCoords, getCoordsFromAddress, validateRadius } from '../helpers/location';
import { api } from '../services/api';
import { _thLocationButton, theme } from '../theme';
import { BroIcons } from './Icons';

interface LocationSelectDropdownProps {
  onLocationSelected?: (events: any[]) => void;
}

const LocationSelectDropdown: React.FC<LocationSelectDropdownProps> = ({ onLocationSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [radius, setRadius] = useState('10');
  const [loading, setLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('Fetching location...');

  useEffect(() => {
    const loadUserLocation = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          const { address } = parsedUser;
          if (address) {
            setCurrentAddress(address);
            setSearchAddress(address); // Profildeki adresi başlangıç değeri olarak ayarlıyoruz
          } else {
            // Profilde adres yoksa, GPS konumunu al
            getCurrentLocation();
          }
        } else {
          // Profil verisi yoksa, GPS konumunu al
          getCurrentLocation();
        }
      } catch (error) {
        console.error("Error loading user location:", error);
        getCurrentLocation(); // Hata durumunda da GPS konumunu al
      }
    };

    loadUserLocation();
  }, []);

  const getCurrentLocation = async () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const address = await getAddressFromCoords(latitude, longitude);

          const user = { latitude, longitude, address };
          await AsyncStorage.setItem('user', JSON.stringify(user));
          setCurrentAddress(address);
          setSearchAddress(address); // Konumu güncelle
          Alert.alert('Success', 'Location retrieved successfully.');
        } catch (err) {
          Alert.alert('Error', 'Failed to retrieve address.');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.log(error);
        Alert.alert('Error', 'Error retrieving location.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSearch = async () => {
    if (!searchAddress.trim()) {
      Alert.alert('Error', 'Address cannot be empty.');
      return;
    }

    if (!validateRadius(radius)) return;

    try {
      // 1. Kullanıcıdan alınan şehir adını kontrol et
      const city = extractCityFromAddress(searchAddress);
      let coords;

      // Eğer şehir boşsa veya "London" gibi bir yanlış değer dönerse, GPS üzerinden konumu al
      if (!city) {
        console.log("City is invalid or not found, using GPS location...");
        const userLocation = await AsyncStorage.getItem('user');
        if (userLocation) {
          const { latitude, longitude } = JSON.parse(userLocation);
          coords = { latitude, longitude };  // GPS üzerinden alınan konumu kullan
        }
      } else {
        // Şehir ismini kullanarak koordinatları al
        coords = await getCoordsFromAddress(city);
      }

      if (!coords) throw new Error('Coordinates not found');

      const user = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        address: city || 'Unknown Location',
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('search_radius', radius);
      await AsyncStorage.setItem('search_address', city || 'Unknown Location');
      setCurrentAddress(city || 'Unknown Location');

      // Etkinlikleri al
      const nearRes = await api.post('/events/near', {
        latitude: coords.latitude,
        longitude: coords.longitude,
        radius: Number(radius),
      });

      if (nearRes.status === 200 && nearRes.data?.data) {
        onLocationSelected?.(nearRes.data.data);
      }

      Alert.alert('Success', 'Location and events fetched successfully.');
      onLocationSelected?.([]);
      setIsOpen(false);
    } catch (err) {
      console.log('Address conversion or event fetch error:', err);
      Alert.alert(
        'Not Found',
        'Not found any event in this location.\nPlease enter a bigger radius or different Location'
      );
    }
  };

  return (
    <View style={_thLocationButton.container}>
      <TouchableOpacity style={_thLocationButton.button} onPress={() => setIsOpen(!isOpen)}>
        <BroIcons.Location size={16} />
        <Text style={_thLocationButton.text}>
          {loading ? 'Fetching...' : currentAddress}
        </Text>
        <BroIcons.ArrowDown size={16} />
      </TouchableOpacity>

      {isOpen && (
        <View style={_thLocationButton.dropdown}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={_thLocationButton.locationButton} onPress={getCurrentLocation}>
              <BroIcons.Location size={16} color="#fff" />
            </TouchableOpacity>
            <TextInput
              style={[_thLocationButton.input, _thLocationButton.parted1]}
              placeholder="Search Address"
              placeholderTextColor={theme.placeholderColor.color}
              value={searchAddress}
              onChangeText={setSearchAddress}
            />
            <TextInput
              style={[_thLocationButton.input, _thLocationButton.parted2]}
              placeholder="Radius (km)"
              keyboardType="numeric"
              value={radius}
              onChangeText={setRadius}
            />
          </View>
          <TouchableOpacity style={_thLocationButton.searchButton} onPress={handleSearch}>
            <Text style={_thLocationButton.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LocationSelectDropdown;
