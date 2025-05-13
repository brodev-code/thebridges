import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { api } from '../services/api';
import {PageHeader} from '../components/PageHeader';
import _thAgreementScreen from '../styles/AgreementStyles';
import { RootStackParamList } from '../routes';
import { StackNavigationProp } from '@react-navigation/stack';


const AgreementScreen: React.FC = () => {
    type NavigationProp = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const [agreement, setAgreement] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAgreement();
    }, []);

    const checkAgreement = async () => {
        try {
            const response = await api.get('/agreement-check');
            if (response.data.accepted) {
                navigation.replace('LocationSelect');
            } else {
                fetchAgreement();
            }
        } catch (error) {
            console.error('Error checking agreement:', error);
            Alert.alert('Hata', 'Anlaşma durumu alınamadı.');
            setLoading(false);
        }
    };

    const fetchAgreement = async () => {
        try {
            const response = await api.get('/agreements');
            setAgreement(response.data.content);
        } catch (error) {
            console.error('Error fetching agreement:', error);
            Alert.alert('Hata', 'Anlaşma metni alınamadı.');
        } finally {
            setLoading(false);
        }
    };

    const acceptAgreement = async () => {
        try {
            setLoading(true);
            await api.post('/agreement-accept');
            await AsyncStorage.setItem('agreementAccepted', 'true');
            navigation.replace('LocationSelect');
        } catch (error) {
            console.error('Error accepting agreement:', error);
            Alert.alert('Hata', 'Anlaşma kabul edilemedi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <PageHeader title="Agreement" />
            <View style={_thAgreementScreen.container}>
                <Text style={_thAgreementScreen.title}>Agreement</Text>
                <ScrollView style={_thAgreementScreen.scrollContainer}>
                    <Text style={_thAgreementScreen.agreementText}>{agreement}</Text>
                </ScrollView>
                <TouchableOpacity
                    onPress={acceptAgreement}
                    style={_thAgreementScreen.button}
                    disabled={loading}
                >
                    <Text style={_thAgreementScreen.buttonText}>
                        {loading ? 'Processing...' : 'Accept Agreement'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default AgreementScreen;
