import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import { auth } from '../services/firebase';
import { theme } from '../theme';
import { RootStackParamList } from '../routes';
import { _thOTPScreen } from '../styles/OtpStyles';
import { PageHeader } from '../components/PageHeader';
import { api } from '../services/api';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { phone } = route.params;
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [confirm, setConfirm] = useState<any>(null);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [resendTimer, setResendTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    sendOTP();
  }, [phone]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const sendOTP = async () => {
    try {
      setIsResendDisabled(true);
      setResendTimer(120);
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      Alert.alert('Success', 'Your OTP has send to your phone');
    } catch (error: any) {
      console.error('OTP sending error:', error);
      Alert.alert('Error', 'OTP could not send: ' + error.message);
    }
  };

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    const otpString = otp.join('');
  
    if (otpString.length !== 6) {
      Alert.alert('Error', 'Please Enter Your 6 numbered Code');
      return;
    }
  
    setLoading(true);
  
    try {
      if (!confirm) {
        Alert.alert('Hata', 'OTP gönderiminde bir sorun oluştu, lütfen tekrar deneyin.');
        setLoading(false);
        return;
      }
  
      const userCredential = await confirm.confirm(otpString);
      console.log('OTP doğrulandı:', userCredential);
  
      const response = await api.post('firebase-login', {
        firebase_uid: userCredential.user.uid,
        provider_id: deviceId,
        phoneNumber: userCredential.user.phoneNumber,
      });
  
      const result = response.data;
  
      if (result.code === '200') {
        console.log('Giriş başarılı:', result.data);
  
        await AsyncStorage.setItem('auth_token', result.data.token);
        await AsyncStorage.setItem('user_data', JSON.stringify(result.data.user));
  
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else {
        Alert.alert('Hata', result.message);
      }
    } catch (error: any) {
      console.error('OTP doğrulama hatası:', error);
  
      // API isteği sırasında alınan hatayı detaylı bir şekilde loglayın
      if (error.response) {
        console.error('API Yanıtı:', error.response.data);
        console.error('API Durum Kodu:', error.response.status);
        console.error('API Başlıklar:', error.response.headers);
      } else if (error.request) {
        console.error('API İsteği:', error.request);
      } else {
        console.error('Hata Mesajı:', error.message);
      }
  
      Alert.alert('Hata', 'OTP doğrulaması başarısız: ' + error.message);
    }
  
    setLoading(false);
  };

  return (
    <>
      <PageHeader title="Verify OTP" />
      <View style={[_thOTPScreen.container, theme.container]}>
        <View style={_thOTPScreen.topArea}>
          <Text style={[_thOTPScreen.description]}>
            Enter the 6-digit code sent to {phone} to verify your identity.
          </Text>
          <View style={_thOTPScreen.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => {inputRefs.current[index] = el}}
                style={[_thOTPScreen.otpInput]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
              />
            ))}
          </View>
        </View>
        <View style={_thOTPScreen.bottomArea}>
          <TouchableOpacity
            style={[_thOTPScreen.buttonOutline, theme.mB8]}
            onPress={sendOTP}
            disabled={isResendDisabled}
          >
            <Text style={[_thOTPScreen.buttonOutlineText]}>
              {isResendDisabled ? `${formatTime(resendTimer)} Resend SMS OTP` : 'Resend SMS OTP'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[_thOTPScreen.button, loading && { backgroundColor: '#ccc' }]} 
            onPress={handleVerifyOtp}
            disabled={loading} 
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" /> 
            ) : (
              <Text style={[_thOTPScreen.buttonText]}>Next</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default OtpScreen;
