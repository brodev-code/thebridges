import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { theme } from '../theme';
import { _thloginScreen} from '../styles/LoginStyles';
import { AuthController } from '../controllers/AuthController';
import { RootStackParamList } from '../routes';
import { BroIcons } from '../components/Icons';


const LoginScreen: React.FC = () => {
    // Use the correct type with useNavigation
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '189167724942-33lqan10npgl30uplj59vvumnfpkpk87.apps.googleusercontent.com', // Firebase Console'dan al
            offlineAccess: true,
        });
    }, []);

      if (loading) {
        return <ActivityIndicator size="large" color="#6C63FF" />;
      }
    

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo: any = await GoogleSignin.signIn();
    
            console.log('Google Sign-In Response:', userInfo); // Dönen veriyi kontrol et
    
            // Gelen userInfo nesnesini kontrol et
            if (!userInfo || !userInfo.user || !userInfo.user.idToken) {
                throw new Error('Google sign-in failed: No idToken received');
            }
    
            const idToken = userInfo.user.idToken;  // idToken'ı doğru şekilde al
            console.log('idToken:', idToken);  // Token'ı kontrol et
    
            // Google token'ı ile login işlemi
            const result = await AuthController.googleLogin(idToken);
            if (result.success) {
                navigation.navigate('Home');
            } else {
                Alert.alert('Login Failed', result.message);
            }
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);
            Alert.alert('Login Error', error.message || 'Google login failed.');
        }
    };
    
    const handleGuestLogin = async () => {
        try {
            await AuthController.guestLogin(navigation);
        } catch (error) {
            Alert.alert('Guest login failed:'+error);
            console.error('Guest login failed:', error);
            Alert.alert('Error', 'Failed to log in as a guest.');
        }
    };
    
    const handleNext = async () => {
        // Telefon numarasının E.164 formatında olması gerekebilir (örn: "+9055xxxxxxx")
        if (!phone) {
        Alert.alert('Hata', 'Lütfen telefon numaranızı giriniz.');
        return;
        }
        navigation.navigate('Otp', { phone });
    };

    const handleSingUp = () => {
        navigation.navigate('Register');
    };

    return (
        <>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={[_thloginScreen.container, theme.container]}>
            <Image
                source={require('../assets/logo.png')}
                style={_thloginScreen.logo}
                resizeMode="contain"
            />
        <View style={_thloginScreen.bottomPart}>
            <Text style={[_thloginScreen.label, theme.label, theme.textLeft]}>Sign-in your phone</Text>
            <TextInput
                style={[_thloginScreen.input, theme.input]}
                placeholder="Phone"
                placeholderTextColor={theme.placeholderColor.color}
                value={phone}
                onChangeText={setPhone}
            />

            <TouchableOpacity onPress={handleSingUp} style={[_thloginScreen.forgotPassword,theme.mB16]}>
                <Text style={[_thloginScreen.forgotPassword]}>Register / Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[_thloginScreen.button, theme.button]} onPress={handleNext}>
                <Text style={[_thloginScreen.buttonText, theme.buttonText]}>Next</Text>
            </TouchableOpacity>

            <View style={_thloginScreen.socialButtonsContainer}>
                <TouchableOpacity style={[_thloginScreen.socialButton, theme.appleButton]}>
                    <Text style={[_thloginScreen.socialButtonText, theme.buttonText]}>
                        <BroIcons.Apple size={16} color='white' />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[_thloginScreen.socialButton, theme.facebookButton]}>
                    <Text style={[_thloginScreen.socialButtonText, theme.buttonText]}>
                        <BroIcons.Facebook size={16} color='white' />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[_thloginScreen.socialButton, theme.googleButton]} onPress={handleGoogleLogin}>
                        <Text style={[_thloginScreen.socialButtonText, theme.buttonText]}>
                            <BroIcons.Google size={16} color="white" />
                        </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleGuestLogin}>
                <Text style={[_thloginScreen.guestText]}>Continue as a Guest</Text>
            </TouchableOpacity>
        </View>
    </View>
    </>
    );
};



export default LoginScreen;
