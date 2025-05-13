import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { api } from '../services/api';
import { _thLocationButton, theme } from '../theme';
import { User } from '../models/User';
import { BroIcons } from './Icons';

const LocationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [searchAddress, setSearchAddress] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userJson = await AsyncStorage.getItem('user');
                if (userJson) {
                    const userData: User = JSON.parse(userJson);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user from storage:', error);
            }
        };

        fetchUser();
    }, []);

    const toggleDropdown = async () => {
        setIsOpen(!isOpen);
    };

    const getCurrentLocation = async () => {
        setLoading(true);
        Geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    // API isteği: Koordinatlardan adres al
                    const locationResponse = await api.post('location-coordinates', {
                        latitude,
                        longitude,
                    });

                    if (locationResponse.data.status === 'success') {
                        setSearchAddress(locationResponse.data.address || 'Adres bulunamadı');
                    } else {
                        Alert.alert('Hata', 'Konum bilgisi alınamadı.');
                    }
                } catch (error: any) {
                    console.error('Error fetching location address:', error);
                    Alert.alert(
                        'Hata',
                        `Konum bilgisi alınırken hata oluştu: ${error.response?.data?.message || error.message}`
                    );
                } finally {
                    setLoading(false);
                }
            },
            (error: any) => {
                console.error('Error getting current position:', error);
                Alert.alert('Hata', 'Konum bilgisi alınırken hata oluştu.');
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const handleSearch = async () => {
        try {
            if (!searchAddress.trim()) {
                Alert.alert('Hata', 'Adres boş olamaz.');
                return;
            }

            // API isteği: Koordinat alma (Adresten)
            const coordinatesResponse = await api.post('location-address', {
                address: searchAddress,
            });

            if (coordinatesResponse.data.status === 'success') {
                const { lat, lng } = coordinatesResponse.data.location;

                const updatedUser: User = {
                    ...user,
                    location: searchAddress,
                    latitude: lat,
                    longitude: lng,
                };

                setUser(updatedUser);
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

                // User'ın yerini kaydet
                const userUpdater = async () => {
                    try {
                        const response = await api.post('location-user', {
                            location: searchAddress,
                            latitude: lat,
                            longitude: lng
                        });
                        Alert.alert('Success', 'User location updated successfully!');
                    } catch (error: any) {
                        console.error('Error updating user profile:', error);
                        Alert.alert(
                            'ERROR',
                            `While user location update has error occured: ${error.response?.data?.message || error.message}`
                        );
                    }
                };
                await userUpdater();

                setIsOpen(false);
            } else {
                Alert.alert('Hata', 'Girilen adres için koordinatlar alınamadı.');
            }
        } catch (error: any) {
            console.error('Error fetching coordinates:', error);
            Alert.alert(
                'Hata',
                `Koordinatlar alınırken hata oluştu: ${error.response?.data?.message || error.message}`
            );
        }
    };

    return (
        <View style={_thLocationButton.container}>
            <TouchableOpacity style={_thLocationButton.button} onPress={toggleDropdown}>
                    <BroIcons.Location size={16}/>
                    <Text style={_thLocationButton.text}>
                        {loading ? 'Getting...' : user?.location || 'No Location'}
                    </Text>
                    <BroIcons.ArrowDown size={16}/>
            </TouchableOpacity>
            {isOpen && (
                <View style={_thLocationButton.dropdown}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={_thLocationButton.locationButton} onPress={getCurrentLocation}>
                            <BroIcons.Location size={16} color="#fff" />
                        </TouchableOpacity>
                        <TextInput
                            style={_thLocationButton.input}
                            placeholder="Search Address"
                            placeholderTextColor={theme.placeholderColor.color}
                            value={searchAddress}
                            onChangeText={setSearchAddress}
                        />
                    </View>
                    <TouchableOpacity style={_thLocationButton.searchButton} onPress={handleSearch}>
                        <Text style={_thLocationButton.searchButtonText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default LocationDropdown;
