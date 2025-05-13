import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api } from '../services/api';
import DeviceInfo from 'react-native-device-info';
import { NavigationProp } from '@react-navigation/native';

export class AuthController {
    static async guestLogin(navigation: NavigationProp<any>): Promise<void> {
        try {
            const authToken = await AsyncStorage.getItem('auth_token');
            if (authToken) {
                console.log('User is already logged in.');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
                return;
            }

            const deviceId = await DeviceInfo.getUniqueId();
            console.log('Device ID:', deviceId);

            const response = await api.post('/guest-login', { provider_id: deviceId });
            const responseData = response.data;

            console.log('Response Data:', responseData);

            if (responseData.code === '200') {
                const { token, user } = responseData.data;

                await AsyncStorage.setItem('auth_token', token);
                await AsyncStorage.setItem('user_data', JSON.stringify(user));

                Alert.alert('Login Successful', 'You are now logged in as a guest.');

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                throw new Error(responseData.message || 'Login failed.');
            }
        } catch (error: any) {
            console.error('Guest Login Error:', error.message || error);

            Alert.alert('Login Error', error.message || 'Something went wrong. Please try again.');

            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }

    static async checkLoginStatus(navigation: NavigationProp<any>): Promise<void> {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const userData = await AsyncStorage.getItem('user_data');

            if (token && userData) {
                console.log('User is already logged in:', JSON.parse(userData));

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                console.log('No user token found. Redirecting to login.');

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }
        } catch (error: any) {
            console.error('Error checking login status:', error.message);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }

    static async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
      try {
          const response = await api.post('/login', { email, password });
          const responseData = response.data;
  
          console.log('Login Response Data:', responseData);
  
          if (responseData.code === '200') {
              const { token, user } = responseData.data;
  
              await AsyncStorage.setItem('auth_token', token);
              await AsyncStorage.setItem('user_data', JSON.stringify(user));
  
              return { success: true, message: 'Login successful.' };
          } else {
              return { success: false, message: responseData.message || 'Login failed.' };
          }
      } catch (error: any) {
          console.error('Login Error:', error.message || error);
          return { success: false, message: error.message || 'Something went wrong. Please try again.' };
      }
  }
  // Forgot password işlevi
  static async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
      try {
          const response = await api.post('password/forgot', { email });
          const responseData = response.data;

          console.log('Forgot Password Response Data:', responseData);

          if (responseData.code === '200') {
              return { success: true, message: 'Password reset link sent to your email.' };
          } else {
              return { success: false, message: responseData.message || 'Failed to send password reset link.' };
          }
      } catch (error: any) {
          console.error('Forgot Password Error:', error.message || error);
          return { success: false, message: error.message || 'Something went wrong. Please try again.' };
      }
  }

    // OTP gönderme işlevi
    static async sendOtp(phone: string): Promise<{ success: boolean; message: string }> {
        try {
            const response = await api.post('otp-send', { phone });
            const responseData = response.data;
            
            console.log('OTP Send Response Data:', responseData);

            if (responseData.code === '200') {
                Alert.alert('Success', 'OTP sent successfully.');
                return { success: true, message: 'OTP sent successfully.' };
            } else {
                return { success: false, message: responseData.message || 'OTP send failed.' };
            }
        } catch (error: any) {
            console.error('OTP Send Error:', error.message || error);
            return { success: false, message: error.message || 'Something went wrong. Please try again.' };
        }
    }

    // OTP doğrulama işlevi
    static async verifyOtp(phone: string, otp: string): Promise<{ success: boolean; message: string }> {
        const deviceId = await DeviceInfo.getUniqueId();
        console.log('Device ID:', deviceId);
        const name = deviceId;
        const password = deviceId;
        try {
            const response = await api.post('otp-verify', { phone, otp, name, password });
            const responseData = response.data;

            console.log('OTP Verify Response Data:', responseData);

            if (responseData.code === '201' && responseData.data.token) {
                return { success: true, message: 'OTP verified successfully.' };
            } else {
                return { success: false, message: responseData.message || 'OTP verification failed.' };
            }
        } catch (error: any) {
            console.error('OTP Verify Error: ', error.message || error);
            return { success: false, message: error.message || 'Something went wrong. Please try again.' };
        }
    }
    //google login
    static async googleLogin(token: string) {
      Alert.alert('Google Token:', token);
        try {
            const response = await api.post('auth/google', {token});
            const responseData = response.data;
            console.log(responseData);
            return await responseData;

        } catch (error) {
            console.error('Google login error:', error);
            return { success: false, message: 'Google login failed' };
        }
    }

    static async saveFacilitatorDetails(
        token: string,
        details: {
          businessName: string;
          businessDescription: string;
          contactNumber: string;
          websiteUrl: string;
          agreement: boolean;
        }
      ): Promise<any> {
        try {
          const response = await api.post('/facilitator-details', details, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      }
      
      //Register
      static async register(
        name: string,
        email: string,
        password: string,
        phone: string,
        birthday: string | undefined,
        gender: string,
        role: 'participant' | 'facilitator',
        facilitatorDetails?: {
          businessName: string;
          businessDescription: string;
          contactNumber: string;
          websiteUrl: string;
          agreement: boolean;
        }
      ): Promise<{ success: boolean; message: string; data?: any }> {
        try {
          const device_id = await DeviceInfo.getUniqueId();
          
          // API'ye gönderilecek veriler
          const payload: any = {
            name,
            email,
            password,
            phone,
            birthday: birthday ? new Date(birthday).toISOString().split('T')[0] : undefined, // YYYY-MM-DD formatında gönder
            gender,
            role,
            device_id,
            c_password: password, // Şifre tekrarı
          };
      
          // API'ye istek gönder
          const response = await api.post('/register', payload);
          const responseData = response.data;
          console.log('Register Response Data:', responseData);
      
          // API'den dönen code kontrolü
          if (responseData.code === '200') {
            const { token, user } = responseData.data;
      
            // Facilitator ise ve detaylar varsa, detayları kaydet
            if (role === 'facilitator' && facilitatorDetails) {
              try {
                await this.saveFacilitatorDetails(token, facilitatorDetails);
                console.log('Facilitator details saved successfully.');
              } catch (error) {
                console.error('Failed to save facilitator details:', error);
                return {
                  success: false,
                  message: 'Registration successful, but failed to save facilitator details.',
                  data: responseData.data,
                };
              }
            }
      
            // Token ve user bilgisini AsyncStorage'e kaydet
            await AsyncStorage.setItem('auth_token', token);
            await AsyncStorage.setItem('user_data', JSON.stringify(user));
      
            return { success: true, message: 'Registration successful.', data: responseData.data };
          } else if (responseData.code === '409') {
            return {
              success: false,
              message: 'User already exists. Please log in.',
            };
          } else {
            return {
              success: false,
              message: responseData.message || 'Registration failed.',
            };
          }
        } catch (error: any) {
          console.error('Register Error:', error.message || error);
          return {
            success: false,
            message: error.response?.data?.message || 'Something went wrong. Please try again.',
          };
        }
      }
     
      
}
