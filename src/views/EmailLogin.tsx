import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../theme';
import { _thloginScreen } from '../styles/LoginStyles';
import { RootStackParamList } from '../routes';
import { PageHeader } from '../components/PageHeader';
import { AuthController } from '../controllers/AuthController';

const EmailLoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        try {
            const response = await AuthController.login(email, password);
            if (response.success) {
                navigation.navigate('Home'); // Başarılı girişte yönlendirme
            } else {
                Alert.alert('Login Failed', response.message);
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };

    const handleForgotPassword = async () => {
        navigation.navigate('ForgotPassword'); // Şifre sıfırlama ekranına yönlendirme
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <PageHeader title="Email Login" />
            <View style={[_thloginScreen.container, theme.container]}>
                <Image
                    source={require('../assets/logo.png')}
                    style={_thloginScreen.logo}
                    resizeMode="contain"
                />
                <View style={_thloginScreen.bottomPart}>
                    <Text style={[_thloginScreen.label, theme.label, theme.textLeft]}>
                        Sign-in your email
                    </Text>
                    <TextInput
                        style={[_thloginScreen.input, theme.input]}
                        placeholder="Email"
                        placeholderTextColor={theme.placeholderColor.color}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={[_thloginScreen.input, theme.input]}
                        placeholder="Password"
                        placeholderTextColor={theme.placeholderColor.color}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        onPress={handleForgotPassword}
                        style={[_thloginScreen.forgotPassword, theme.mB16]}
                    >
                        <Text style={_thloginScreen.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[_thloginScreen.button, theme.button]}
                        onPress={handleLogin}
                    >
                        <Text style={[_thloginScreen.buttonText, theme.buttonText]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default EmailLoginScreen;
