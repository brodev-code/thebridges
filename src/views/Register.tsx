import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  Switch,
  StatusBar
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AuthController } from '../controllers/AuthController';
import { _thRegister } from '../styles/RegisterStyles';
import { PageHeader } from '../components/PageHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import { BroIcons } from '../components/Icons';
import { theme } from '../theme';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [role, setRole] = useState<'participant' | 'facilitator'>('participant');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState('');
  const [openGender, setOpenGender] = useState(false);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Facilitator'a özel alanlar
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [agreement, setAgreement] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); // iOS için picker açık kalabilir
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const device_id = await DeviceInfo.getUniqueId();
      
      const facilitatorDetails = role === 'facilitator' ? {
        businessName,
        businessDescription,
        contactNumber,
        websiteUrl,
        agreement,
      } : undefined;

      const { success, message, data } = await AuthController.register(
        name,
        email,
        password,
        phone,
        birthday ? new Date(birthday).toISOString().split('T')[0] : undefined, // YYYY-MM-DD formatında gönder
        gender,
        role,
        facilitatorDetails
      );

      if (success) {
        Alert.alert('Success', 'Registration successful.');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Register failed:', error);
      Alert.alert('Error', 'Failed to register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PageHeader title="Register" showEmailLogin />
        <ScrollView style={_thRegister.container}>
          <View style={_thRegister.tabContainer}>
            <TouchableOpacity
              style={[_thRegister.tabButton, role === 'participant' && _thRegister.tabButtonActive]}
              onPress={() => setRole('participant')}>
              <Text style={[_thRegister.tabButtonText, role === 'participant' && _thRegister.tabButtonTextActive]}>
                Participant
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[_thRegister.tabButton, role === 'facilitator' && _thRegister.tabButtonActive]}
              onPress={() => setRole('facilitator')}>
              <Text style={[_thRegister.tabButtonText, role === 'facilitator' && _thRegister.tabButtonTextActive]}>
                Facilitator
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput style={_thRegister.input} placeholder="Full Name" value={name} onChangeText={setName} placeholderTextColor={theme.placeholderColor.color} />
          <TextInput style={_thRegister.input} placeholder="Mail" value={email} onChangeText={setEmail} placeholderTextColor={theme.placeholderColor.color} />
          <TouchableOpacity style={_thRegister.input} onPress={() => setShowDatePicker(true)}>
            <Text style={{ color: birthday ? '#000' : '#999' }}>
              {birthday ? birthday.toLocaleDateString() : 'Select Birthday'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && <DateTimePicker value={birthday || new Date()} mode="date" onChange={onChangeDate} />}

          <DropDownPicker
            open={openGender}
            value={gender}
            items={[
              { label: 'Female', value: 'female' },
              { label: 'Male', value: 'male' },
              { label: 'Other', value: 'other' },
            ]}
            setOpen={setOpenGender}
            setValue={setGender}
            style={_thRegister.picker}
          />

          {/* Telefon */}
          <TextInput style={_thRegister.input} keyboardType="phone-pad" placeholder="Phone" value={phone} onChangeText={setPhone} placeholderTextColor={theme.placeholderColor.color} />
          
          {/* Şifre */}
          <View style={_thRegister.passwordWrapper}>
            <TextInput
              style={[_thRegister.input, { flex: 1 }]}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={theme.placeholderColor.color}
            />
            <TouchableOpacity
              style={_thRegister.showHideButton}
              onPress={() => setShowPassword(!showPassword)}>
              {/* Kendi ikon setini kullanabilirsin */}
              {showPassword ? (
                <BroIcons.EyeClosed size={20} color="#666" />
              ) : (
                <BroIcons.Eye size={20} color="#666" />
              )}
            </TouchableOpacity>
          </View>



          {role === 'facilitator' && (
            <>
              <TextInput style={_thRegister.input} placeholder="Business Name" value={businessName} onChangeText={setBusinessName} placeholderTextColor={theme.placeholderColor.color}/>
              <TextInput style={_thRegister.input} placeholder="Business Description" value={businessDescription} onChangeText={setBusinessDescription} placeholderTextColor={theme.placeholderColor.color} />
              <TextInput style={_thRegister.input} placeholder="Contact Number" value={contactNumber} onChangeText={setContactNumber} placeholderTextColor={theme.placeholderColor.color} />
              <TextInput style={_thRegister.input} placeholder="Website URL" value={websiteUrl} onChangeText={setWebsiteUrl} placeholderTextColor={theme.placeholderColor.color}/>
              <View style={_thRegister.switchContainer}>
                <Text style={_thRegister.switchText}>Agreement</Text>
                <Switch value={agreement} onValueChange={setAgreement} />
              </View>
            </>
          )}

          <TouchableOpacity style={_thRegister.saveButton} onPress={handleRegister} disabled={loading}>
            <Text style={_thRegister.saveButtonText}>{loading ? 'Saving...' : 'Register'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

export default RegisterScreen;