import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, PermissionsAndroid, Platform, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { api } from '../services/api';
import { _thLocationSelect } from '../styles/LocationSelectStyles';
import { User } from '../models/User';
import { BroIcons } from '../components/Icons';
import { PageHeader } from '../components/PageHeader';
import { theme } from '../theme';

const LocationSelect: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [searchAddress, setSearchAddress] = useState('');
    const [loading, setLoading] = useState(false); // Loading state eklendi

    useEffect(() => {
        requestLocationPermission();
        fetchUser();
        fetchUserLocation(); // Kullanıcı konumunu çek
    }, []);

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('İzin Gerekli', 'Konum izni verilmedi. Lütfen manuel konum girin.');
            }
        }
    };

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

    // Kullanıcının kaydedilmiş konumunu API'den al
    const fetchUserLocation = async () => {
        setLoading(true); // Konum çekmeye başlamadan önce loading true yapıyoruz
        try {
            const locationResponse = await api.get('location-user');

            if (locationResponse.data.status === 'success') {
                const { location, latitude, longitude } = locationResponse.data.data;
                setSearchAddress(location); // Konumu ekle

                // Kullanıcıyı güncelle (isteğe bağlı)
                const updatedUser: User = { ...user, location, latitude, longitude };
                setUser(updatedUser);
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error('Error fetching user location:', error);
        } finally {
            setLoading(false); // Konum işlemi bitince loading false yapıyoruz
        }
    };

    const getCurrentLocation = async () => {
        setLoading(true); // Konum almaya başlarken loading true
        Geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const locationResponse = await api.post('location-coordinates', { latitude, longitude });

                    if (locationResponse.data.status === 'success') {
                        const address = locationResponse.data.address || 'Adres bulunamadı';
                        setSearchAddress(address);

                        const updatedUser: User = { ...user, location: address, latitude, longitude };
                        setUser(updatedUser);
                        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
                        await api.put('user/profile', { location: address, latitude, longitude });

                        Alert.alert('Başarılı', 'Konum başarıyla güncellendi.');
                    } else {
                        Alert.alert('Hata', 'Konum bilgisi alınamadı.');
                    }
                } catch (error: any) {
                    console.error('Error fetching location address:', error);
                    Alert.alert('Hata', 'Konum alınırken hata oluştu.');
                } finally {
                    setLoading(false); // Konum alındıktan sonra loading false
                }
            },
            (error) => {
                console.error('Error getting current position:', error);
                Alert.alert('Hata', 'Konum bilgisi alınırken hata oluştu.');
                setLoading(false); // Konum alınamadığında da loading false
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const handleSearch = async () => {
        setLoading(true); // Konum kaydetme işlemi başlarken loading true
        try {
            if (!searchAddress.trim()) {
                Alert.alert('Hata', 'Adres boş olamaz.');
                return;
            }

            const coordinatesResponse = await api.post('location-address', { address: searchAddress });

            if (coordinatesResponse.data.status === 'success') {
                const { lat, lng } = coordinatesResponse.data.location;

                const updatedUser: User = { ...user, location: searchAddress, latitude: lat, longitude: lng };
                setUser(updatedUser);
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
                await api.put('user/profile', { location: searchAddress, latitude: lat, longitude: lng });

                Alert.alert('Başarılı', 'Kullanıcı profili güncellendi.');
            } else {
                Alert.alert('Hata', 'Girilen adres için koordinatlar alınamadı.');
            }
        } catch (error: any) {
            console.error('Error fetching coordinates:', error);
            Alert.alert('Hata', 'Koordinatlar alınırken hata oluştu.');
        } finally {
            setLoading(false); // Konum kaydedildikten sonra loading false
        }
    };

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <PageHeader title="Location" />
            <View style={_thLocationSelect.container}>
                <Text style={_thLocationSelect.label}>Select your Location</Text>
                <Text style={_thLocationSelect.description}>
                    Choose your current location to help us show you nearby events and experiences tailored just for you.
                </Text>

                <View style={_thLocationSelect.inputContainer}>
                    <TouchableOpacity onPress={getCurrentLocation}>
                        <BroIcons.Location size={18} color="#6B7280" />
                    </TouchableOpacity>
                    <TextInput
                        style={_thLocationSelect.input}
                        placeholder="Select location"
                        placeholderTextColor={theme.placeholderColor.color}
                        value={searchAddress}
                        onChangeText={setSearchAddress}
                    />
                </View>                
                {loading ? <ActivityIndicator size="large" color={theme.primary.color} style={{ marginVertical: 20 }} />:
                <TouchableOpacity style={_thLocationSelect.button} onPress={handleSearch}>
                    <Text style={_thLocationSelect.buttonText}>Save Location</Text>
                </TouchableOpacity>
                }
            </View>
        </>
    );
};

export default LocationSelect;
