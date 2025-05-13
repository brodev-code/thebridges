import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    StatusBar,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../theme';
import { _thloginScreen } from '../styles/LoginStyles';
import { RootStackParamList } from '../routes';
import { PageHeader } from '../components/PageHeader';
import { AuthController } from '../controllers/AuthController';

const ForgotPasswordScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');

    const handleSendResetLink = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        try {
            const response = await AuthController.forgotPassword(email);
            if (response.success) {
                Alert.alert('Success', 'Password reset link sent to your email.');
                navigation.goBack();
            } else {
                Alert.alert('Failed', response.message || 'Could not send reset link.');
            }
        } catch (error) {
            console.error('Forgot Password Error:', error);
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <PageHeader title="Forgot Password" />
            <View style={[_thloginScreen.container, theme.container]}>
                <Image
                    source={require('../assets/logo.png')}
                    style={_thloginScreen.logo}
                    resizeMode="contain"
                />
                <View style={_thloginScreen.bottomPart}>
                    <Text style={[_thloginScreen.label, theme.label, theme.textLeft]}>
                        Enter your email to reset password
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
                    <TouchableOpacity
                        style={[_thloginScreen.button, theme.button, { marginTop: 24 }]}
                        onPress={handleSendResetLink}
                    >
                        <Text style={[_thloginScreen.buttonText, theme.buttonText]}>
                            Send Reset Link
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default ForgotPasswordScreen;
